// @flow
'use strict'

const {
  elementSchema,
  formSchema,
  pageElementSchema,
} = require('./forms-schema.js')

const Joi = require('joi')

function validateJoiSchema /* :: <T> */(
  data /* : mixed */,
  schema /* : Object */,
  options /* : ?Object */,
) /* : T */ {
  const result = Joi.validate(data, schema, options)
  if (result.error) {
    throw result.error
  }
  return result.value
}

function validateWithFormSchema(form /* : mixed */) /* : Form */ {
  const validatedForm /* : Form */ = validateJoiSchema(form, formSchema, {
    stripUnknown: true,
  })

  const { publishStartDate, publishEndDate } = validatedForm
  if (!!publishStartDate && !!publishEndDate) {
    const startDate = new Date(publishStartDate)
    const endDate = new Date(publishEndDate)
    if (startDate >= endDate)
      throw new Error('Publish Start Date must be before Publish End Date')
  }
  return validatedForm
}

function validateWithElementSchema /* :: <T: _FormElementBase> */(
  element /* : mixed */,
) /* : T */ {
  const validatedElement = validateJoiSchema(element, elementSchema, {
    stripUnknown: true,
  })
  return validatedElement
}

function validateWithPageElementSchema(
  element /* :mixed */,
) /* :PageElement */ {
  const validatedElement = validateJoiSchema(element, pageElementSchema, {
    stripUnknown: true,
  })
  return validatedElement
}

module.exports = {
  validateWithFormSchema,
  validateWithElementSchema,
  validateWithPageElementSchema,
}
