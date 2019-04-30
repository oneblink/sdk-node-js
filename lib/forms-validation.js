// @flow
'use strict'

const { elementSchema, formSchema } = require('./forms-schema.js')

const Joi = require('joi')

async function validateJoiSchema /* :: <T> */ (
  data /* : mixed */,
  schema /* : Object */,
  options /* : ?Object */
) /* : Promise<T> */ {
  return new Promise((resolve, reject) => {
    Joi.validate(data, schema, options, (error, value) => {
      if (error) {
        if (!Array.isArray(error.details)) {
          error.details = []
        }
        reject(new Error((error.details[0] || error).message))
        return
      }
      return resolve(value)
    })
  })
}

async function validateWithFormSchema (form /* : Form */) /* : Promise<Form> */ {
  const validatedForm = await validateJoiSchema(form, formSchema)
  return validatedForm
}

async function validateWithElementSchema (element /* : FormElement */) /* : Promise<FormElement> */ {
  const validatedElement = await validateJoiSchema(element, elementSchema)
  return validatedElement
}

module.exports = {
  validateWithFormSchema,
  validateWithElementSchema
}
