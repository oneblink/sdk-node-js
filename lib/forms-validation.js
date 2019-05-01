// @flow
'use strict'

const { elementSchema, formSchema } = require('./forms-schema.js')

const Joi = require('joi')

function validateJoiSchema /* :: <T> */ (
  data /* : mixed */,
  schema /* : Object */,
  options /* : ?Object */
) /* : T */ {
  const validatedResult = Joi.validate(data, schema, options)
  if (validatedResult.error) {
    throw new Error(validatedResult.error)
  } else return validatedResult.value
}

function validateWithFormSchema (form /* : mixed */) /* : Form */ {
  const validatedForm = validateJoiSchema(form, formSchema)
  return validatedForm
}

function validateWithElementSchema (element /* : mixed */) /* : FormElement */ {
  const validatedElement = validateJoiSchema(element, elementSchema)
  return validatedElement
}

module.exports = {
  validateWithFormSchema,
  validateWithElementSchema
}
