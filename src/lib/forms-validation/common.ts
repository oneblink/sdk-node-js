import { typeCastService } from '@oneblink/sdk-core'
import { FormTypes } from '@oneblink/types'
import Joi from 'joi'

export function validateJoiSchema<T>(
  data: unknown,
  schema: Joi.Schema<T>,
):
  | {
      success: true
      data: T
    }
  | {
      success: false
      error: Joi.ValidationError
    } {
  const result = schema.validate(data, {
    stripUnknown: true,
  })
  if (result.error) {
    return {
      success: false,
      error: result.error,
    }
  }
  return {
    success: true,
    data: result.value,
  }
}

/**
 * Reduce an array of form elements down to the elements that are not purely to
 * determine the layout of the form. I.e. Strips out "page" and "section" form
 * elements as they only contribute to the layout of the form. "repeatableSet"
 * form elements are not stripped out because they contribute to the submission
 * data.
 *
 * @param elements
 * @returns
 */
export const stripLayoutFormElements = (
  elements: Array<FormTypes.FormElement>,
): Array<FormTypes.FormElement> => {
  const rootFormElements = []
  for (const element of elements) {
    const namelessElement =
      typeCastService.formElements.toNamelessElement(element)
    if (namelessElement) {
      rootFormElements.push(
        ...stripLayoutFormElements(namelessElement.elements),
      )
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
