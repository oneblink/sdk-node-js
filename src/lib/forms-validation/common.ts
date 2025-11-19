import { formElementsService, typeCastService } from '@oneblink/sdk-core'
import { FormTypes, SubmissionEventTypes } from '@oneblink/types'
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

function checkElementNameUniqueness(
  elementNames: string[],
  name: string,
  propertyName: string,
) {
  // check if name already exists
  const existingName = elementNames.includes(name)
  if (existingName) {
    throw new Error(
      `"${propertyName}" contains an element with a "name" (${name}) property that is not unique`,
    )
  }
}

export function validateElementNamesAcrossNestedElements(
  elements: FormTypes.FormElement[],
  propertyName: string,
): string[] {
  const elementNames = []
  for (const element of elements) {
    switch (element.type) {
      case 'page':
      case 'section': {
        const childNames = validateElementNamesAcrossNestedElements(
          element.elements,
          propertyName,
        )
        for (const name of childNames) {
          checkElementNameUniqueness(elementNames, name, propertyName)
          elementNames.push(name)
        }
        break
      }
      default: {
        checkElementNameUniqueness(elementNames, element.name, propertyName)
        elementNames.push(element.name)
      }
    }
  }
  return elementNames
}

export function validateFormElementMappings({
  mappings,
  validatedFormElements,
  propertyName,
}: {
  mappings: SubmissionEventTypes.FormElementMapping<Record<string, unknown>>[]
  validatedFormElements: FormTypes.FormElement[]
  propertyName: string
}) {
  for (let mappingIndex = 0; mappingIndex < mappings.length; mappingIndex++) {
    const mapping = mappings[mappingIndex]
    if (
      mapping.type === 'FORM_ELEMENT' ||
      mapping.type === 'FORM_FORM_ELEMENT'
    ) {
      const element = formElementsService.findFormElement(
        validatedFormElements,
        ({ id }) => id === mapping.formElementId,
      )
      if (!element) {
        throw new Error(
          `"${propertyName}[${mappingIndex}].formElementId" (${mapping.formElementId}) does not exist in "elements".`,
        )
      }
      if (mapping.type === 'FORM_FORM_ELEMENT' && element.type !== 'form') {
        throw new Error(
          `"${propertyName}[${mappingIndex}].formElementId" (${mapping.formElementId}) must be the "id" for a "form" type element.`,
        )
      }
    }
  }
}

export function validatePDFConfiguration({
  pdfConfiguration,
  propertyName,
  customPDFs,
  validatedFormElements,
}: {
  pdfConfiguration: NonNullable<
    FormTypes.Form['postSubmissionReceipt']
  >['allowPDFDownload']
  propertyName: string
  customPDFs: FormTypes.Form['customPDFs']
  validatedFormElements: FormTypes.FormElement[]
}) {
  if (!pdfConfiguration) {
    return
  }

  if (Array.isArray(pdfConfiguration)) {
    pdfConfiguration.forEach(({ configuration }, index) => {
      validatePDFConfiguration({
        pdfConfiguration: configuration,
        propertyName: `${propertyName}[${index}]`,
        customPDFs,
        validatedFormElements,
      })
    })

    return
  }

  const customPdfId = pdfConfiguration.customPdfId
  if (customPdfId && !customPDFs?.some(({ id }) => id === customPdfId)) {
    throw new Error(
      `"${propertyName}.customPdfId" (${customPdfId}) must reference a "customPDFs[].id" property.`,
    )
  }

  if (pdfConfiguration.excludedElementIds) {
    for (
      let elementIdIndex = 0;
      elementIdIndex < pdfConfiguration.excludedElementIds.length;
      elementIdIndex++
    ) {
      const elementId = pdfConfiguration.excludedElementIds[elementIdIndex]
      const element = formElementsService.findFormElement(
        validatedFormElements,
        ({ id }) => id === elementId,
      )
      if (!element) {
        throw new Error(
          `"${propertyName}.excludedElementIds[${elementIdIndex}]" (${elementId}) does not exist in "elements".`,
        )
      }
    }
  }
}
