import Joi from 'joi'
import { FormTypes } from '@oneblink/types'
import { elementSchema, formSchema, pageElementSchema } from './forms-schema'

function validateJoiSchema<T>(
  data: unknown,
  schema: Joi.SchemaLike,
  options?: Joi.ValidationOptions,
): T {
  const result = Joi.validate(data, schema, options)
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

export {
  validateWithFormSchema,
  validateWithElementSchema,
  validateWithPageElementSchema,
}
