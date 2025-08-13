import { formElementsService, typeCastService } from '@oneblink/sdk-core'
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
  validatePDFConfiguration,
  validateFormElementMappings,
} from './common'
import validateFormEvents, { validateFormEvent } from './validate-form-events'
import Joi from 'joi'

function validateFormEventData(
  workflowEvent: unknown,
  {
    formElements,
    customPDFs,
  }: {
    formElements: FormTypes.FormElement[]
    customPDFs: FormTypes.Form['customPDFs']
  },
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
      customPDFs,
    })
    return result
  } catch (error) {
    return {
      success: false,
      error: error as Joi.ValidationError,
    }
  }
}

function validateFormElementReferences({
  availableFormElements,
  formElements,
  propertyName,
}: {
  availableFormElements: FormTypes.FormElement[]
  formElements: FormTypes.FormElement[]
  propertyName: string
}) {
  // Element References
  let formElementIndex = -1
  for (const element of formElements) {
    formElementIndex++
    const currentPropertyName = `${propertyName}[${formElementIndex}]`
    switch (element.type) {
      case 'page':
      case 'section': {
        validateFormElementReferences({
          availableFormElements,
          formElements: element.elements,
          propertyName: `${currentPropertyName}.elements`,
        })
        break
      }
      case 'repeatableSet': {
        const nextPropertyName = `${currentPropertyName}.elements`
        validateElementNamesAcrossNestedElements(
          element.elements,
          nextPropertyName,
        )
        validateFormElementReferences({
          availableFormElements: element.elements,
          formElements: element.elements,
          propertyName: nextPropertyName,
        })
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

/**
 * Validate each summary form element's references to other form elements. A
 * summary form element can reference form elements from anywhere in the form.
 *
 * @param form
 * @param formElements
 */
function validateConditionallyShowOptions(
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
        validateConditionallyShowOptions(
          form,
          element.elements,
          `${propertyName}[${formElementIndex}].elements`,
        )
        break
      }
      default: {
        const optionsElement =
          typeCastService.formElements.toOptionsElement(element)
        if (optionsElement && optionsElement.conditionallyShowOptions) {
          const options = optionsElement.options ?? []
          if (!optionsElement.conditionallyShowOptionsElementIds?.length) {
            throw new Error(
              `"${propertyName}[${formElementIndex}].conditionallyShowOptionsElementIds" must contain at least 1 item`,
            )
          }
          for (let i = 0; i < options.length; i++) {
            if (
              options[i].attributes?.length !==
              optionsElement.conditionallyShowOptionsElementIds?.length
            ) {
              throw new Error(
                `"${propertyName}[${formElementIndex}].options[${i}].attributes" must contain ${optionsElement.conditionallyShowOptionsElementIds?.length} items"`,
              )
            }
          }
        }
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
    validateElementNamesAcrossNestedElements(validatedForm.elements, 'elements')

    const { publishStartDate, publishEndDate } = validatedForm
    if (!!publishStartDate && !!publishEndDate) {
      const startDate = new Date(publishStartDate)
      const endDate = new Date(publishEndDate)
      if (startDate >= endDate)
        throw new Error(
          `"publishStartDate" (${publishStartDate}) must be before "publishEndDate" (${publishEndDate})`,
        )
    }

    if (!validatedForm.submissionEvents) {
      validatedForm.submissionEvents = []
    }

    validateSummaryFormElements(
      validatedForm,
      validatedForm.elements,
      'elements',
    )

    validateConditionallyShowOptions(
      validatedForm,
      validatedForm.elements,
      'elements',
    )

    validateFormElementReferences({
      availableFormElements: validatedForm.elements,
      formElements: validatedForm.elements,
      propertyName: 'elements',
    })

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
        customPDFs: validatedForm.customPDFs,
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

    validatePDFConfiguration({
      pdfConfiguration: validatedForm.postSubmissionReceipt?.allowPDFDownload,
      validatedFormElements: validatedForm.elements,
      customPDFs: validatedForm.customPDFs,
      propertyName: 'postSubmissionReceipt.allowPDFDownload',
    })

    const labels: string[] = []
    for (const step of validatedForm.approvalSteps ?? []) {
      if (step.type === 'CONCURRENT') {
        for (const node of step.nodes) {
          if (labels.includes(node.label)) {
            throw new Error(
              `"approvalSteps" contains a CONCURRENT step with a "label" (${node.label}) property that is not unique`,
            )
          }
          labels.push(node.label)
        }
      } else {
        if (labels.includes(step.label)) {
          throw new Error(
            `"approvalSteps" contains a STANDARD step with a "label" (${step.label}) property that is not unique`,
          )
        }
        labels.push(step.label)
      }
    }

    const customPDFs = validatedForm.customPDFs ?? []
    for (const customPDF of customPDFs ?? []) {
      const index = customPDFs.indexOf(customPDF)
      validateFormElementMappings({
        mappings:
          customPDF.mapping as SubmissionEventTypes.FormElementMapping<undefined>[],
        validatedFormElements: validatedForm.elements,
        propertyName: `customPDFs[${index}].mappings`,
      })
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
