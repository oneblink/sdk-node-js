import Joi from 'joi'
import { formElementsService } from '@oneblink/sdk-core'
import {
  FormTypes,
  ConditionTypes,
  SubmissionEventTypes,
} from '@oneblink/types'
import {
  elementSchema,
  formSchema,
  pageElementSchema,
  apiRequestSchema,
  WorkflowEventSchema,
} from '../forms-schema'
import { ConditionalPredicatesItemSchema } from '../forms-schema/property-schemas'
import {
  validateJoiSchema,
  getRootFormElements,
  validateElementNamesAcrossNestedElements,
} from './common'
import validateFormEvents, { validateFormEvent } from './validate-form-events'

function validateFormEventData(
  formElements: FormTypes.FormElement[],
  workflowEvent: unknown,
): SubmissionEventTypes.FormEvent {
  const formEvent = validateJoiSchema(workflowEvent, WorkflowEventSchema, {
    stripUnknown: true,
  }) as SubmissionEventTypes.FormEvent
  validateFormEvent({
    formEvent,
    propertyName: 'formEvent',
    validatedFormElements: formElements,
    rootFormElements: getRootFormElements(formElements),
  })
  return formEvent
}

function validateReferenceDate({
  element,
  referenceType,
  elements,
}: {
  element: FormTypes.DateElement | FormTypes.DateTimeElement
  referenceType: 'toDateElementId' | 'fromDateElementId'
  elements: FormTypes.FormElement[]
}) {
  if (element[referenceType]) {
    //ensure element exists and is the same type
    const referencedElement = elements.find(
      (el) => el.id === element[referenceType],
    )
    if (!referencedElement) {
      throw new Error(`Referenced ${referenceType} not found`)
    }
    if (referencedElement.type !== element.type) {
      throw new Error(`Referenced ${referenceType} not a ${element.type}`)
    }
  }
}

function validateFormElementReferences(
  rootElements: FormTypes.FormElement[],
  formElements: FormTypes.FormElement[],
) {
  // Element References
  for (const element of rootElements) {
    switch (element.type) {
      case 'summary': {
        element.elementIds.forEach((elementId) => {
          if (elementId === element.id) {
            throw new Error('Summary element cannot summarised self')
          }
          const summarizedElement = formElementsService.findFormElement(
            formElements,
            (formElement) => formElement.id === elementId,
          )
          if (!summarizedElement) {
            throw new Error('Summarised elementId not found')
          }

          const validSummaryElementTypes = [
            'text',
            'textarea',
            'number',
            'email',
            'telephone',
            'barcodeScanner',
            'date',
            'datetime',
            'time',
            'select',
            'radio',
            'checkboxes',
            'autocomplete',
            'calculation',
          ]
          if (
            !validSummaryElementTypes.some(
              (type) => type === summarizedElement.type,
            )
          ) {
            throw new Error('Summarised element type not valid')
          }
        })
        break
      }
      case 'date':
      case 'datetime': {
        if (element.toDateElementId) {
          validateReferenceDate({
            element,
            referenceType: 'toDateElementId',
            elements: rootElements,
          })
        }
        if (element.fromDateElementId) {
          validateReferenceDate({
            element,
            referenceType: 'fromDateElementId',
            elements: rootElements,
          })
        }
        break
      }
      case 'repeatableSet': {
        validateElementNamesAcrossNestedElements(element.elements)
        const repSetRootElements = getRootFormElements(element.elements)
        validateFormElementReferences(repSetRootElements, element.elements)
        break
      }
    }
  }
}

function validateWithFormSchema(form?: unknown): FormTypes.Form {
  const validatedForm: FormTypes.Form = validateJoiSchema(form, formSchema, {
    stripUnknown: true,
  })

  // validate element names are unique (including elements without a name with children)
  validateElementNamesAcrossNestedElements(validatedForm.elements)

  const { publishStartDate, publishEndDate } = validatedForm
  if (!!publishStartDate && !!publishEndDate) {
    const startDate = new Date(publishStartDate)
    const endDate = new Date(publishEndDate)
    if (startDate >= endDate)
      throw new Error('Publish Start Date must be before Publish End Date')
  }

  if (!validatedForm.submissionEvents) {
    validatedForm.submissionEvents = []
  }

  const rootFormElements = getRootFormElements(validatedForm.elements)

  validateFormElementReferences(rootFormElements, validatedForm.elements)

  // Form Event References
  const formEventPropsToValidate = [
    'draftEvents',
    'schedulingEvents',
    'paymentEvents',
    'submissionEvents',
    'approvalEvents',
  ] as const
  for (const formEventProp of formEventPropsToValidate) {
    validateFormEvents({
      formEvents: validatedForm[formEventProp] || [],
      propertyName: formEventProp,
      rootFormElements,
      validatedFormElements: validatedForm.elements,
    })
  }

  const defaultNotificationEmailElementId =
    validatedForm.approvalConfiguration?.defaultNotificationEmailElementId
  if (defaultNotificationEmailElementId) {
    const element = rootFormElements.find(
      ({ id }) => id === defaultNotificationEmailElementId,
    )
    if (!element) {
      throw new Error(
        `"approvalConfiguration.defaultNotificationEmailElementId" (${defaultNotificationEmailElementId}) does not exist in "elements"`,
      )
    }
    if (element.type !== 'email') {
      throw new Error(
        `"approvalConfiguration.defaultNotificationEmailElementId" (${defaultNotificationEmailElementId}) references an element that is not type "email" (${element.type})`,
      )
    }
  }

  if (
    validatedForm.postSubmissionReceipt?.allowPDFDownload?.excludedElementIds
  ) {
    for (const elementId of validatedForm.postSubmissionReceipt.allowPDFDownload
      .excludedElementIds) {
      const element = formElementsService.findFormElement(
        validatedForm.elements,
        ({ id }) => id === elementId,
      )
      if (!element) {
        throw new Error(
          `You tried to reference an element (${elementId}) in "postSubmissionReceipt.allowPDFDownload.excludedElementIds" that does not exist on the form.`,
        )
      }
    }
  }

  return validatedForm
}

function validateWithElementSchema<T extends FormTypes._FormElementBase>(
  element: unknown,
): T {
  const validatedElement = validateJoiSchema<T>(element, elementSchema, {
    stripUnknown: true,
  })

  return validatedElement
}

function validateWithPageElementSchema(
  element: unknown,
): FormTypes.PageElement {
  const validatedElement = validateJoiSchema<FormTypes.PageElement>(
    element,
    pageElementSchema,
    {
      stripUnknown: true,
    },
  )
  return validatedElement
}

function validateConditionalPredicates(
  predicates: Array<unknown>,
): Array<ConditionTypes.ConditionalPredicate> {
  const schema = Joi.array()
    .min(1)
    .items(ConditionalPredicatesItemSchema)
    .required()

  const validatedPredicates = validateJoiSchema<
    Array<ConditionTypes.ConditionalPredicate>
  >(predicates, schema, {
    stripUnknown: true,
  })
  return validatedPredicates
}

function validateApiRequest(
  apiRequest: unknown,
): FormTypes.FormServerValidation {
  const validatedApiRequest = validateJoiSchema<FormTypes.FormServerValidation>(
    apiRequest,
    apiRequestSchema,
    {
      stripUnknown: true,
    },
  )
  return validatedApiRequest
}

export {
  validateFormEventData,
  validateWithFormSchema,
  validateWithElementSchema,
  validateWithPageElementSchema,
  validateConditionalPredicates,
  validateApiRequest,
}
