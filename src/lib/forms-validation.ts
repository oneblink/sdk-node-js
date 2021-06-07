import Joi from 'joi'
import { FormTypes, ConditionTypes } from '@oneblink/types'
import { elementSchema, formSchema, pageElementSchema } from './forms-schema'
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

function validateWithFormSchema(form?: unknown): FormTypes.Form {
  const validatedForm: FormTypes.Form = validateJoiSchema(form, formSchema, {
    stripUnknown: true,
  })

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

  for (
    let submissionEventIndex = 0;
    submissionEventIndex < validatedForm.submissionEvents.length;
    submissionEventIndex++
  ) {
    const submissionEvent = validatedForm.submissionEvents[submissionEventIndex]
    switch (submissionEvent.type) {
      case 'CIVICA_CRM': {
        for (
          let mappingIndex = 0;
          mappingIndex < submissionEvent.configuration.mapping.length;
          mappingIndex++
        ) {
          const { formElementId } =
            submissionEvent.configuration.mapping[mappingIndex]
          const formElement = findFormElement(
            validatedForm.elements,
            ({ id }) => id === formElementId,
          )
          if (!formElement) {
            throw new Error(
              `"submissionEvents[${submissionEventIndex}].configuration.mapping[${mappingIndex}].formElementId" (${formElementId}) does not exist in "elements"`,
            )
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

function findFormElement(
  elements: FormTypes.FormElement[],
  predicate: (
    element: FormTypes.FormElement,
    elements: FormTypes.FormElement[],
  ) => boolean,
  parentElements: FormTypes.FormElement[] = [],
): FormTypes.FormElement | void {
  for (const element of elements) {
    if (predicate(element, parentElements)) {
      return element
    }

    if (
      (element.type === 'repeatableSet' ||
        element.type === 'page' ||
        element.type === 'form' ||
        element.type === 'infoPage') &&
      Array.isArray(element.elements)
    ) {
      const nestedElement = findFormElement(element.elements, predicate, [
        ...parentElements,
        element,
      ])

      if (nestedElement) {
        return nestedElement
      }
    }
  }
}

export {
  validateWithFormSchema,
  validateWithElementSchema,
  validateWithPageElementSchema,
  validateConditionalPredicates,
}
