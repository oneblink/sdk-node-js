// @flow
'use strict'

const uuid = require('uuid/v4')

const { validateWithElementSchema } = require('../lib/forms-validation.js')

async function generateFormElement (
  formElementGenerationData /* : mixed */
) /* : Promise<FormElement> */ {
  if (!formElementGenerationData) {
    throw new Error('no form element generation data provided, please provide this data to generate a form element')
  }

  // initialise empty element object and spread data passed by user
  const formElement /* : Object */ = { ...formElementGenerationData }

  // element property: id
  formElement.id = uuid()

  // element property: options
  if (Array.isArray(formElementGenerationData.options)) {
    const options = formElementGenerationData.options.map(option => {
      if (option && typeof option === 'object') {
        option.id = uuid()
        if (!option.label) {
          option.label = option.value ? option.value : option.id
        }
        if (!option.value) {
          option.value = option.label ? option.label : option.id
        }
        return option
      } else {
        return {
          id: uuid(),
          label: 'label',
          value: 'value'
        }
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
  if (typeof formElementGenerationData.name === 'string') {
    formElement.name = formElementGenerationData.name.replace(/\s+/g, '_')
  } else {
    formElement.name = formElement.label.replace(/\s+/g, '_')
  }

  // element property: conditionallyShow || default: false
  formElement.conditionallyShow = formElementGenerationData.conditionallyShow || false

  // element property: readOnly || default: false
  formElement.readOnly = formElementGenerationData.readOnly || false

  const validatedFormElement = await validateWithElementSchema(formElement)
  return validatedFormElement
}

module.exports = generateFormElement
