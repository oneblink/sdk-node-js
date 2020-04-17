// @flow
'use strict'

const { elementSchema, formSchema } = require('./forms-schema.js')

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
  const validatedForm = validateJoiSchema(form, formSchema, {
    stripUnknown: true,
  })
  return validatedForm
}

function validateWithElementSchema(element /* : mixed */) /* : FormElement */ {
  const validatedElement = validateJoiSchema(element, elementSchema, {
    stripUnknown: true,
  })
  return validatedElement
}

module.exports = {
  validateWithFormSchema,
  validateWithElementSchema,
}
