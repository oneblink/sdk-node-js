import { FormTypes } from '@oneblink/types'
import { v4 as uuid } from 'uuid'
import { validateWithPageElementSchema } from './forms-validation'
import generateFormElement from './generate-form-element'

export default function generatePageElement(
  formElementGenerationData?: Record<string, unknown>,
): FormTypes.PageElement {
  if (!formElementGenerationData) {
    throw new Error(
      'no page element generation data provided, please provide this data to generate a page element',
    )
  }
  const formElement: Record<string, unknown> = {
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
