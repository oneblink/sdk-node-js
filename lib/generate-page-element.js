// @flow
'use strict'

const { v4: uuid } = require('uuid')
const { validateWithPageElementSchema } = require('../lib/forms-validation.js')
const generateFormElement = require('./generate-form-element')

function generatePageElement(
  formElementGenerationData /* : mixed */,
) /* :PageElement */ {
  if (!formElementGenerationData) {
    throw new Error(
      'no page element generation data provided, please provide this data to generate a page element',
    )
  }
  const formElement /* : Object */ = {
    ...formElementGenerationData,
    type: 'page',
  }

  // element property: id
  if (typeof formElementGenerationData.id === 'string') {
    formElement.id = formElementGenerationData.id
  } else {
    formElement.id = uuid()
  }
  // element property: label || default to: {type}
  if (typeof formElementGenerationData.label === 'string') {
    formElement.label = formElementGenerationData.label
  } else {
    formElement.label = formElement.type
  }
  if (!Array.isArray(formElement.elements)) {
    formElement.elements = [generateFormElement({})]
  }
  const element = validateWithPageElementSchema(formElement)
  return element
}

module.exports = generatePageElement
