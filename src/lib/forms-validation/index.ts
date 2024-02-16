import { formElementsService } from '@oneblink/sdk-core'
import {
  FormTypes,
  ConditionTypes,
  SubmissionEventTypes,
  MiscTypes,
} from '@oneblink/types'
import {
  NewFormSchema,
  endpointConfigurationSchema,
  WorkflowEventSchema,
} from '../forms-schema'
import { ConditionalPredicatesSchema } from '../forms-schema/property-schemas'
import {
  stripLayoutFormElements,
  validateElementNamesAcrossNestedElements,
} from './common'
import validateFormEvents, { validateFormEvent } from './validate-form-events'
import FormElementSchema from '../forms-schema/element-schema'
import PageElementSchema from '../forms-schema/elements/PageElement'

function validateFormEventData(
  formElements: FormTypes.FormElement[],
  workflowEvent: unknown,
): SubmissionEventTypes.FormEvent {
  const formEvent = WorkflowEventSchema.parse(workflowEvent)
  validateFormEvent({
    formEvent,
    propertyName: 'formEvent',
    validatedFormElements: formElements,
    rootFormElements: stripLayoutFormElements(formElements),
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

function validateFormElementReferences(formElements: FormTypes.FormElement[]) {
  const availableFormElements = stripLayoutFormElements(formElements)
  // Element References
  for (const element of availableFormElements) {
    switch (element.type) {
      case 'date':
      case 'datetime': {
        if (element.toDateElementId) {
          validateReferenceDate({
            element,
            referenceType: 'toDateElementId',
            elements: availableFormElements,
          })
        }
        if (element.fromDateElementId) {
          validateReferenceDate({
            element,
            referenceType: 'fromDateElementId',
            elements: availableFormElements,
          })
        }
        break
      }
      case 'repeatableSet': {
        validateElementNamesAcrossNestedElements(element.elements)
        validateFormElementReferences(element.elements)
        break
      }
    }
  }
}

/**
 * Validate each summary form element's references to other form elements. A
 * summary form element can reference form elements from anywhere in the form.
 *
 * @param form
 * @param formElements
 */
function validateSummaryFormElements(
  form: FormTypes.NewForm,
  formElements: FormTypes.FormElement[],
  propertyName: string,
) {
  for (
    let formElementIndex = 0;
    formElementIndex < formElements.length;
    formElementIndex++
  ) {
    const element = formElements[formElementIndex]
    switch (element.type) {
      case 'section':
      case 'page':
      case 'repeatableSet': {
        validateSummaryFormElements(
          form,
          element.elements,
          `${propertyName}[${formElementIndex}].elements`,
        )
        break
      }
      case 'summary': {
        for (
          let elementIdIndex = 0;
          elementIdIndex < element.elementIds.length;
          elementIdIndex++
        ) {
          const elementId = element.elementIds[elementIdIndex]
          if (elementId === element.id) {
            throw new Error(
              `"${propertyName}[${formElementIndex}].elementIds" cannot contain a reference to itself`,
            )
          }
          const summarizedElement = formElementsService.findFormElement(
            form.elements,
            (formElement) => formElement.id === elementId,
          )
          if (!summarizedElement) {
            throw new Error(
              `"${propertyName}[${formElementIndex}].elementIds[${elementIdIndex}]" (${elementId}) does not exist in "elements"`,
            )
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
            throw new Error(
              `"${propertyName}[${formElementIndex}].elementIds[${elementIdIndex}]" (${elementId}) references a form element type (${summarizedElement.type}) that cannot be summarised`,
            )
          }
        }
        break
      }
    }
  }
}

function validateWithFormSchema(form?: unknown): FormTypes.NewForm {
  const validatedForm = NewFormSchema.parse(form)

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

  validateSummaryFormElements(validatedForm, validatedForm.elements, 'elements')
  validateFormElementReferences(validatedForm.elements)

  const rootFormElements = stripLayoutFormElements(validatedForm.elements)

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
  return FormElementSchema.parse(element) as unknown as T
}

function validateWithPageElementSchema(
  element: unknown,
): FormTypes.PageElement {
  return PageElementSchema.parse(element)
}

function validateConditionalPredicates(
  predicates: Array<unknown>,
): Array<ConditionTypes.ConditionalPredicate> {
  return ConditionalPredicatesSchema.parse(predicates)
}

function validateEndpointConfiguration(
  apiRequest: unknown,
): MiscTypes.EndpointConfiguration {
  return endpointConfigurationSchema.parse(apiRequest)
}

export {
  validateFormEventData,
  validateWithFormSchema,
  validateWithElementSchema,
  validateWithPageElementSchema,
  validateConditionalPredicates,
  validateEndpointConfiguration,
}
