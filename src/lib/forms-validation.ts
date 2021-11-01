import Joi from 'joi'
import { formElementsService } from '@oneblink/sdk-core'
import { FormTypes, ConditionTypes } from '@oneblink/types'
import {
  elementSchema,
  formSchema,
  pageElementSchema,
  apiRequestSchema,
} from './forms-schema'
import { ConditionalPredicatesItemSchema } from './forms-schema/property-schemas'

function validateJoiSchema<T>(
  data: unknown,
  schema: Joi.Schema,
  options?: Joi.ValidationOptions,
): T {
  const result = schema.validate(data, options)
  if (result.error) {
    throw result.error
  }

  return result.value as T
}

const getRootFormElements = (
  elements: Array<FormTypes.FormElement>,
): Array<FormTypes.FormElement> => {
  const rootFormElements = []
  for (const element of elements) {
    if (element.type === 'page' || element.type === 'section') {
      rootFormElements.push(...getRootFormElements(element.elements))
    } else {
      rootFormElements.push(element)
    }
  }
  return rootFormElements
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

  for (const rootFormElement of rootFormElements) {
    switch (rootFormElement.type) {
      case 'summary': {
        rootFormElement.elementIds.forEach((elementId) => {
          if (elementId === rootFormElement.id) {
            throw new Error('Summary element cannot summarised self')
          }
          const summarizedElement = formElementsService.findFormElement(
            validatedForm.elements,
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
    }
  }

  for (
    let submissionEventIndex = 0;
    submissionEventIndex < validatedForm.submissionEvents.length;
    submissionEventIndex++
  ) {
    const submissionEvent = validatedForm.submissionEvents[submissionEventIndex]

    // CHECK ANY CONDITIONAL ELEMENT IDS ARE IN THE FORM
    if (
      submissionEvent.conditionallyExecutePredicates &&
      submissionEvent.conditionallyExecute
    ) {
      for (
        let conditionallyExecutePredicateIndex = 0;
        conditionallyExecutePredicateIndex <
        submissionEvent.conditionallyExecutePredicates.length;
        conditionallyExecutePredicateIndex++
      ) {
        const conditionallyExecutePredicate =
          submissionEvent.conditionallyExecutePredicates[
            conditionallyExecutePredicateIndex
          ]
        if (
          !rootFormElements.some(
            ({ id }) => id === conditionallyExecutePredicate.elementId,
          )
        ) {
          throw new Error(
            `"submissionEvents[${submissionEventIndex}].conditionallyExecutePredicates[${conditionallyExecutePredicateIndex}].elementId" (${conditionallyExecutePredicate.elementId}) does not exist in "elements"`,
          )
        }
      }
    }

    switch (submissionEvent.type) {
      case 'CP_PAY':
      case 'WESTPAC_QUICK_WEB':
      case 'BPOINT': {
        const formElement = rootFormElements.find(
          ({ id }) => id === submissionEvent.configuration.elementId,
        )
        if (!formElement) {
          throw new Error(
            `"submissionEvents[${submissionEventIndex}].configuration.elementId" (${submissionEvent.configuration.elementId}) does not exist in "elements"`,
          )
        }
        if (
          formElement.type !== 'number' &&
          formElement.type !== 'calculation'
        ) {
          throw new Error(
            `"submissionEvents[${submissionEventIndex}].configuration.elementId" (${submissionEvent.configuration.elementId}) references a form element that is not a "number" or "calculation" element.`,
          )
        }
        break
      }
      case 'SCHEDULING': {
        const nameElementId = submissionEvent.configuration.nameElementId
        if (nameElementId) {
          const formElement = rootFormElements.find(
            ({ id }) => id === nameElementId,
          )
          if (!formElement) {
            throw new Error(
              `"submissionEvents[${submissionEventIndex}].configuration.nameElementId" (${nameElementId}) does not exist in "elements"`,
            )
          }
          if (formElement.type !== 'text') {
            throw new Error(
              `"submissionEvents[${submissionEventIndex}].configuration.nameElementId" (${nameElementId}) references a form element that is not a "text" element.`,
            )
          }
        }
        const emailElementId = submissionEvent.configuration.emailElementId
        if (emailElementId) {
          const formElement = rootFormElements.find(
            ({ id }) => id === emailElementId,
          )
          if (!formElement) {
            throw new Error(
              `"submissionEvents[${submissionEventIndex}].configuration.emailElementId" (${emailElementId}) does not exist in "elements"`,
            )
          }
          if (formElement.type !== 'email') {
            throw new Error(
              `"submissionEvents[${submissionEventIndex}].configuration.emailElementId" (${emailElementId}) references a form element that is not an "email" element.`,
            )
          }
        }
        break
      }
      case 'CIVICA_CRM': {
        for (
          let mappingIndex = 0;
          mappingIndex < submissionEvent.configuration.mapping.length;
          mappingIndex++
        ) {
          const { formElementId } =
            submissionEvent.configuration.mapping[mappingIndex]
          if (!rootFormElements.some(({ id }) => id === formElementId)) {
            throw new Error(
              `"submissionEvents[${submissionEventIndex}].configuration.mapping[${mappingIndex}].formElementId" (${formElementId}) does not exist in "elements"`,
            )
          }
        }
        break
      }
      case 'CP_HCMS': {
        if (submissionEvent.configuration.encryptedElementIds) {
          for (const elementId of submissionEvent.configuration
            .encryptedElementIds) {
            const element = formElementsService.findFormElement(
              validatedForm.elements,
              ({ id }) => id === elementId,
            )
            if (!element) {
              throw new Error(
                `You tried to reference an element ${elementId} that does not exist on the form, in a ${submissionEvent.type} submission event.`,
              )
            }
            const allowedElementTypes = [
              'text',
              'email',
              'telephone',
              'barcodeScanner',
              'radio',
              'autocomplete',
              'camera',
              'draw',
              'files',
              'file',
              'select',
            ]
            if (
              !allowedElementTypes.some(
                (elementType) => elementType === element.type,
              ) ||
              (element.type === 'select' && element.multi)
            ) {
              throw new Error('Encrypted element is not an allowed type')
            }
          }
        }
        break
      }
      case 'PDF': {
        if (submissionEvent.configuration.emailTemplate) {
          for (
            let mappingIndex = 0;
            mappingIndex <
            submissionEvent.configuration.emailTemplate.mapping.length;
            mappingIndex++
          ) {
            const mapping =
              submissionEvent.configuration.emailTemplate.mapping[mappingIndex]

            if (mapping.type === 'FORM_ELEMENT') {
              const element = formElementsService.findFormElement(
                validatedForm.elements,
                ({ id }) => id === mapping.formElementId,
              )
              if (!element) {
                throw new Error(
                  `"submissionEvents[${submissionEventIndex}].configuration.mapping[${mappingIndex}].formElementId" (${mapping.formElementId}) does not exist in "elements".`,
                )
              }
            }
          }
        }

        if (submissionEvent.configuration.excludedElementIds) {
          for (const elementId of submissionEvent.configuration
            .excludedElementIds) {
            const element = formElementsService.findFormElement(
              validatedForm.elements,
              ({ id }) => id === elementId,
            )
            if (!element) {
              throw new Error(
                `You tried to reference an element ${elementId} that does not exist on the form, in a ${submissionEvent.type} submission event.`,
              )
            }
          }
        }
        break
      }
      default: {
        break
      }
    }
  }

  return validatedForm
}

function validateElementNamesAcrossNestedElements(
  elements: FormTypes.FormElement[],
): string[] {
  const elementNames = []
  for (const element of elements) {
    if (element.type === 'page' || element.type === 'section') {
      const childNames = validateElementNamesAcrossNestedElements(
        element.elements,
      )
      for (const name of childNames) {
        checkElementNameUniqueness(elementNames, name)
        elementNames.push(name)
      }
    } else {
      checkElementNameUniqueness(elementNames, element.name)
      elementNames.push(element.name)
    }
  }
  return elementNames
}

function checkElementNameUniqueness(elementNames: string[], name: string) {
  // check if name already exists
  const existingName = elementNames.find((e) => e === name)
  if (existingName) {
    throw new Error(`Element name is not unique: ${name}`)
  }
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
    .unique('elementId')
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
  validateWithFormSchema,
  validateWithElementSchema,
  validateWithPageElementSchema,
  validateConditionalPredicates,
  validateApiRequest,
}
