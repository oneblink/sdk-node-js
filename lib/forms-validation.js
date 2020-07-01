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
  const validatedForm = validateJoiSchema(form, formSchema, {
    stripUnknown: true,
  })
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
