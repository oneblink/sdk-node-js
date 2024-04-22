import { formElementsService } from '@oneblink/sdk-core'
import { FormTypes, SubmissionEventTypes } from '@oneblink/types'
import {
  elementSchema,
  formSchema,
  pageElementSchema,
  endpointConfigurationSchema,
  WorkflowEventSchema,
} from '../forms-schema'
import {
  validateJoiSchema,
  stripLayoutFormElements,
  validateElementNamesAcrossNestedElements,
} from './common'
import validateFormEvents, { validateFormEvent } from './validate-form-events'
import Joi from 'joi'

function validateFormEventData(
  formElements: FormTypes.FormElement[],
  workflowEvent: unknown,
):
  | {
      success: false
      error: Joi.ValidationError
    }
  | {
      success: true
      data: SubmissionEventTypes.FormEvent
    } {
  const result = validateJoiSchema<SubmissionEventTypes.FormEvent>(
    workflowEvent,
    WorkflowEventSchema,
  )
  if (!result.success) {
    return result
  }
  try {
    validateFormEvent({
      formEvent: result.data,
      propertyName: 'formEvent',
      validatedFormElements: formElements,
      rootFormElements: stripLayoutFormElements(formElements),
    })
    return result
  } catch (error) {
    return {
      success: false,
      error: error as Joi.ValidationError,
    }
  }
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

function validateLocationReferenceElement({
  formattedAddressElementId,
  elements,
}: {
  formattedAddressElementId: string | undefined
  elements: FormTypes.FormElement[]
}) {
  if (!formattedAddressElementId) {
    throw new Error('formattedAddressElementId does not have a value')
  }
  //ensure element exists and is a valid type
  const referencedElement = elements.find(
    (el) => el.id === formattedAddressElementId,
  )
  if (!referencedElement) {
    throw new Error(`Referenced formattedAddressElementId not found`)
  }
  const validReferenceTypes: FormTypes.FormElement['type'][] = [
    'text',
    'geoscapeAddress',
  ]
  if (!validReferenceTypes.includes(referencedElement.type)) {
    throw new Error(
      `Referenced ${referencedElement.type} type not one of ${validReferenceTypes.join(',')}`,
    )
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
      case 'location': {
        if (element.showStreetAddress) {
          validateLocationReferenceElement({
            formattedAddressElementId: element.formattedAddressElementId,
            elements: availableFormElements,
          })
        }
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

function validateWithFormSchema(form?: unknown):
  | {
      success: false
      error: Joi.ValidationError
    }
  | {
      success: true
      data: FormTypes.NewForm
    } {
  const result = validateJoiSchema<FormTypes.NewForm>(form, formSchema)
  if (!result.success) {
    return result
  }
  const validatedForm = result.data

  try {
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

    validateSummaryFormElements(
      validatedForm,
      validatedForm.elements,
      'elements',
    )
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
      for (const elementId of validatedForm.postSubmissionReceipt
        .allowPDFDownload.excludedElementIds) {
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

    return {
      success: true,
      data: validatedForm,
    }
  } catch (error) {
    return {
      success: false,
      error: error as Joi.ValidationError,
    }
  }
}

function validateWithElementSchema<T extends FormTypes._FormElementBase>(
  element: unknown,
) {
  const validatedElement = validateJoiSchema<T>(element, elementSchema)

  return validatedElement
}

function validateWithPageElementSchema(element: unknown) {
  return validateJoiSchema<FormTypes.PageElement>(element, pageElementSchema)
}

function validateEndpointConfiguration(data: unknown):
  | {
      success: false
      error: Joi.ValidationError
    }
  | {
      success: true
      data: FormTypes.FormServerValidation
    } {
  return validateJoiSchema<FormTypes.FormServerValidation>(
    data,
    endpointConfigurationSchema,
  )
}

export {
  validateFormEventData,
  validateWithFormSchema,
  validateWithElementSchema,
  validateWithPageElementSchema,
  validateEndpointConfiguration,
}
