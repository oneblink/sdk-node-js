import { FormTypes } from '@oneblink/types'
import Joi from 'joi'

export function validateJoiSchema<T>(
  data: unknown,
  schema: Joi.Schema,
  options?: Joi.ValidationOptions,
): T {
  const result = schema.validate(data, options)
  if (result.error) {
    throw result.error
  }

  return result.value as T
}

export const getRootFormElements = (
  elements: Array<FormTypes.FormElement>,
): Array<FormTypes.FormElement> => {
  const rootFormElements = []
  for (const element of elements) {
    if (element.type === 'page' || element.type === 'section') {
      rootFormElements.push(...getRootFormElements(element.elements))
    } else {
      rootFormElements.push(element)
    }
  }
  return rootFormElements
}

function checkElementNameUniqueness(elementNames: string[], name: string) {
  // check if name already exists
  const existingName = elementNames.find((e) => e === name)
  if (existingName) {
    throw new Error(`Element name is not unique: ${name}`)
  }
}

export function validateElementNamesAcrossNestedElements(
  elements: FormTypes.FormElement[],
): string[] {
  const elementNames = []
  for (const element of elements) {
    if (element.type === 'page' || element.type === 'section') {
      const childNames = validateElementNamesAcrossNestedElements(
        element.elements,
      )
      for (const name of childNames) {
        checkElementNameUniqueness(elementNames, name)
        elementNames.push(name)
      }
    } else {
      checkElementNameUniqueness(elementNames, element.name)
      elementNames.push(element.name)
    }
  }
  return elementNames
}
