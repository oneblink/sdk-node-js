import { formElementsService } from '@oneblink/sdk-core'
import { FormTypes, SubmissionEventTypes } from '@oneblink/types'
import { validateFormElementMappings, validatePDFConfiguration } from './common'

type BaseProps = {
  rootFormElements: FormTypes.FormElement[]
  validatedFormElements: FormTypes.FormElement[]
  propertyName: string
  customPDFs: FormTypes.Form['customPDFs']
}
const validateFormEvents = ({
  rootFormElements,
  validatedFormElements,
  propertyName,
  formEvents,
  customPDFs,
}: BaseProps & {
  formEvents: SubmissionEventTypes.FormEvent[]
}) => {
  for (
    let formEventIndex = 0;
    formEventIndex < formEvents.length;
    formEventIndex++
  ) {
    const formEvent = formEvents[formEventIndex]
    validateFormEvent({
      formEvent,
      propertyName: `${propertyName}[${formEventIndex}]`,
      rootFormElements,
      validatedFormElements,
      customPDFs,
    })
  }
}
export default validateFormEvents

export const validateFormEvent = ({
  formEvent,
  rootFormElements,
  validatedFormElements,
  customPDFs,
  propertyName,
}: BaseProps & {
  formEvent: SubmissionEventTypes.FormEvent
}) => {
  switch (formEvent.type) {
    case 'CP_PAY':
    case 'WESTPAC_QUICK_STREAM':
    case 'BPOINT':
    case 'NSW_GOV_PAY': {
      const formElement = rootFormElements.find(
        ({ id }) => id === formEvent.configuration.elementId,
      )
      if (!formElement) {
        throw new Error(
          `"${propertyName}.configuration.elementId" (${formEvent.configuration.elementId}) does not exist in "elements"`,
        )
      }
      if (formElement.type !== 'number' && formElement.type !== 'calculation') {
        throw new Error(
          `"${propertyName}.configuration.elementId" (${formEvent.configuration.elementId}) references a form element that is not a "number" or "calculation" element.`,
        )
      }
      break
    }
    case 'NYLAS': {
      const nameElementId = formEvent.configuration.nameElementId
      if (nameElementId) {
        const formElement = rootFormElements.find(
          ({ id }) => id === nameElementId,
        )
        if (!formElement) {
          throw new Error(
            `"${propertyName}.configuration.nameElementId" (${nameElementId}) does not exist in "elements"`,
          )
        }
        if (formElement.type !== 'text') {
          throw new Error(
            `"${propertyName}.configuration.nameElementId" (${nameElementId}) references a form element that is not a "text" element.`,
          )
        }
      }
      const emailElementId = formEvent.configuration.emailElementId
      if (emailElementId) {
        const formElement = rootFormElements.find(
          ({ id }) => id === emailElementId,
        )
        if (!formElement) {
          throw new Error(
            `"${propertyName}.configuration.emailElementId" (${emailElementId}) does not exist in "elements"`,
          )
        }
        if (formElement.type !== 'email') {
          throw new Error(
            `"${propertyName}.configuration.emailElementId" (${emailElementId}) references a form element that is not an "email" element.`,
          )
        }
      }
      validatePDFConfiguration({
        pdfConfiguration: formEvent.configuration,
        validatedFormElements,
        customPDFs,
        propertyName: `${propertyName}.configuration`,
      })
      break
    }
    case 'CIVICA_CRM': {
      for (
        let mappingIndex = 0;
        mappingIndex < formEvent.configuration.mapping.length;
        mappingIndex++
      ) {
        const { formElementId } = formEvent.configuration.mapping[mappingIndex]
        if (!rootFormElements.some(({ id }) => id === formElementId)) {
          throw new Error(
            `"${propertyName}.configuration.mapping[${mappingIndex}].formElementId" (${formElementId}) does not exist in "elements"`,
          )
        }
      }
      validatePDFConfiguration({
        pdfConfiguration: formEvent.configuration,
        validatedFormElements,
        customPDFs,
        propertyName: `${propertyName}.configuration`,
      })
      break
    }
    case 'CP_HCMS': {
      if (formEvent.configuration.encryptedElementIds) {
        for (const elementId of formEvent.configuration.encryptedElementIds) {
          const element = formElementsService.findFormElement(
            validatedFormElements,
            ({ id }) => id === elementId,
          )
          if (!element) {
            throw new Error(
              `You tried to reference an element ${elementId} that does not exist on the form, in a ${formEvent.type} form event.`,
            )
          }
          const allowedElementTypes = [
            'text',
            'email',
            'telephone',
            'barcodeScanner',
            'radio',
            'autocomplete',
            'camera',
            'draw',
            'files',
            'file',
            'select',
          ]
          if (
            !allowedElementTypes.some(
              (elementType) => elementType === element.type,
            ) ||
            (element.type === 'select' && element.multi)
          ) {
            throw new Error('Encrypted element is not an allowed type')
          }
        }
      }
      if (formEvent.configuration.notificationElementId) {
        const elementId = formEvent.configuration.notificationElementId
        const element = formElementsService.findFormElement(
          validatedFormElements,
          ({ id }) => id === elementId,
        )
        if (!element) {
          throw new Error(
            `You tried to reference an element ${elementId} that does not exist on the form, in a ${formEvent.type} form event.`,
          )
        }
        if (element.type !== 'boolean') {
          throw new Error('Notification element is not a boolean element')
        }
      }
      validatePDFConfiguration({
        pdfConfiguration: formEvent.configuration,
        validatedFormElements,
        customPDFs,
        propertyName: `${propertyName}.configuration`,
      })
      break
    }
    case 'PDF': {
      validateEmailAddressConfiguration({ formEvent, propertyName })
      validateEmailTemplateMappingElements({
        formEvent,
        validatedFormElements,
        propertyName,
      })
      validatePDFConfiguration({
        pdfConfiguration: formEvent.configuration,
        validatedFormElements,
        customPDFs,
        propertyName: `${propertyName}.configuration`,
      })
      break
    }
    case 'EMAIL': {
      validateEmailAddressConfiguration({ formEvent, propertyName })
      validateEmailTemplateMappingElements({
        formEvent,
        validatedFormElements,
        propertyName,
      })
      break
    }
    case 'SHAREPOINT_CREATE_LIST_ITEM':
    case 'FRESHDESK_CREATE_TICKET': {
      validateFormElementMappings({
        mappings: formEvent.configuration
          .mapping as SubmissionEventTypes.FormElementMapping<undefined>[],
        validatedFormElements,
        propertyName: `${propertyName}.configuration.mapping`,
      })
      break
    }
    case 'TRIM':
    case 'SHAREPOINT_STORE_FILES': {
      validatePDFConfiguration({
        pdfConfiguration: formEvent.configuration,
        validatedFormElements,
        customPDFs,
        propertyName: `${propertyName}.configuration`,
      })
      break
    }
    case 'GOOD_TO_GO_UPDATE_ASSET': {
      const formElement = rootFormElements.find(
        ({ id }) => id === formEvent.configuration.elementId,
      )
      if (!formElement) {
        throw new Error(
          `"${propertyName}.configuration.elementId" (${formEvent.configuration.elementId}) does not exist in "elements"`,
        )
      }

      validateFormElementMappings({
        mappings: formEvent.configuration.mapping,
        validatedFormElements,
        propertyName: `${propertyName}.configuration.mapping`,
      })
      break
    }
    default: {
      break
    }
  }
}

function validateEmailAddressConfiguration({
  formEvent,
  propertyName,
}: {
  formEvent:
    | SubmissionEventTypes.EmailOnlySubmissionEvent
    | SubmissionEventTypes.PdfSubmissionEvent
  propertyName: string
}) {
  const { email, toEmail } = formEvent.configuration
  // at least one must be provided
  if (!email && !toEmail?.length) {
    throw new Error(
      `"${propertyName}.configuration" must contain at least one email address in either email or toEmail properties`,
    )
  }
}

function validateEmailTemplateMappingElements({
  formEvent,
  validatedFormElements,
  propertyName,
}: {
  formEvent:
    | SubmissionEventTypes.EmailOnlySubmissionEvent
    | SubmissionEventTypes.PdfSubmissionEvent
  validatedFormElements: FormTypes.FormElement[]
  propertyName?: string
}) {
  if (formEvent.configuration.emailTemplate) {
    for (
      let mappingIndex = 0;
      mappingIndex < formEvent.configuration.emailTemplate.mapping.length;
      mappingIndex++
    ) {
      const mapping =
        formEvent.configuration.emailTemplate.mapping[mappingIndex]

      if (mapping.type === 'FORM_ELEMENT') {
        const element = formElementsService.findFormElement(
          validatedFormElements,
          ({ id }) => id === mapping.formElementId,
        )
        if (!element) {
          throw new Error(
            `"${propertyName}.configuration.mapping[${mappingIndex}].formElementId" (${mapping.formElementId}) does not exist in "elements".`,
          )
        }
      }
    }
  }
}
