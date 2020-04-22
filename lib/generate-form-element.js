// @flow
'use strict'

const { v4: uuid } = require('uuid')

const { validateWithElementSchema } = require('../lib/forms-validation.js')

function generateFormElement /* :: <T: _FormElementBase> */(
  formElementGenerationData /* : mixed */,
) /* : T */ {
  if (!formElementGenerationData) {
    throw new Error(
      'no form element generation data provided, please provide this data to generate a form element',
    )
  }

  // initialise empty element object and spread data passed by user
  const formElement /* : Object */ = { ...formElementGenerationData }

  // element property: id
  formElement.id = uuid()

  // element property: options
  if (Array.isArray(formElementGenerationData.options)) {
    const options = formElementGenerationData.options.map((o, index) => {
      const option = o || {}
      return {
        ...option,
        id: uuid(),
        label: option.label || option.value || `Option ${index + 1}`,
        value: option.value || index.toString(),
      }
    })
    formElement.options = options
  }

  // element property: type || default to: 'text'
  if (typeof formElementGenerationData.type === 'string') {
    formElement.type = formElementGenerationData.type
  } else {
    formElement.type = 'text'
  }

  // element property: required || default to: false
  if (typeof formElementGenerationData.required === 'boolean') {
    formElement.required = formElementGenerationData.required
  } else {
    formElement.required = false
  }

  // element property: label || default to: {type}
  if (typeof formElementGenerationData.label === 'string') {
    formElement.label = formElementGenerationData.label
  } else {
    formElement.label = formElement.type
  }

  // element property: name || default to: {label(without spaces)}
  if (typeof formElementGenerationData.name !== 'string') {
    formElement.name = formElement.label.replace(/\s+/g, '_')
  }

  // element property: conditionallyShow || default: false
  if (typeof formElementGenerationData.conditionallyShow === 'boolean') {
    formElement.conditionallyShow = formElementGenerationData.conditionallyShow
  } else {
    formElement.conditionallyShow = false
  }

  // element property: readOnly || default: false
  formElement.readOnly = formElementGenerationData.readOnly || false

  const validatedFormElement = validateWithElementSchema(formElement)
  return validatedFormElement
}

module.exports = generateFormElement
