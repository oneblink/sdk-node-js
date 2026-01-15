import { FormTypes } from '@oneblink/types'
import { v4 as uuid } from 'uuid'

import { validateWithElementSchema } from './forms-validation/index.js'

export default function generateFormElement<
  T extends FormTypes._FormElementBase,
>(formElementGenerationData?: Record<string, unknown>): T {
  if (!formElementGenerationData) {
    throw new Error(
      'no form element generation data provided, please provide this data to generate a form element',
    )
  }

  // initialise empty element object and spread data passed by user
  const formElement: Record<string, unknown> = { ...formElementGenerationData }

  // element property: id
  if (typeof formElement.id !== 'string') {
    formElement.id = uuid()
  }

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
  if (typeof formElementGenerationData.type !== 'string') {
    formElement.type = 'text'
  }

  // element property: label || default to: {type}
  let label = ''
  if (typeof formElementGenerationData.label === 'string') {
    label = formElementGenerationData.label
  } else if (typeof formElement.type === 'string') {
    label = formElement.type
  }

  // element property: name || default to: {label(without spaces)}
  if (typeof formElementGenerationData.name !== 'string') {
    formElement.name = label.replace(/\s+/g, '_')
  }
  formElement.label = label

  const result = validateWithElementSchema<T>(formElement)
  if (!result.success) {
    throw result.error
  }

  return result.data
}
