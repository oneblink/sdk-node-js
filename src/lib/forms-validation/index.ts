import Joi from 'joi'
import { formElementsService } from '@oneblink/sdk-core'
import { FormTypes, ConditionTypes } from '@oneblink/types'
import {
  elementSchema,
  formSchema,
  pageElementSchema,
  apiRequestSchema,
} from '../forms-schema'
import { ConditionalPredicatesItemSchema } from '../forms-schema/property-schemas'
import {
  validateJoiSchema,
  getRootFormElements,
  validateElementNamesAcrossNestedElements,
} from './common'
import validateFormEvents from './validate-form-events'

function validateWithFormSchema(form?: unknown): FormTypes.Form {
  const validatedForm: FormTypes.Form = validateJoiSchema(form, formSchema, {
    stripUnknown: true,
  })

  // validate element names are unique (including elements without a name with children)
  validateElementNamesAcrossNestedElements(validatedForm.elements)

  const { publishStartDate, publishEndDate } = validatedForm
  if (!!publishStartDate && !!publishEndDate) {
    const startDate = new Date(publishStartDate)
    const endDate = new Date(publishEndDate)
    if (startDate >= endDate)
      throw new Error('Publish Start Date must be before Publish End Date')
  }

  if (!validatedForm.submissionEvents) {
    validatedForm.submissionEvents = []
  }

  const rootFormElements = getRootFormElements(validatedForm.elements)

  // Element References
  for (const rootFormElement of rootFormElements) {
    switch (rootFormElement.type) {
      case 'summary': {
        rootFormElement.elementIds.forEach((elementId) => {
          if (elementId === rootFormElement.id) {
            throw new Error('Summary element cannot summarised self')
          }
          const summarizedElement = formElementsService.findFormElement(
            validatedForm.elements,
            (formElement) => formElement.id === elementId,
          )
          if (!summarizedElement) {
            throw new Error('Summarised elementId not found')
          }

          const validSummaryElementTypes = [
            'text',
            'textarea',
            'number',
            'email',
            'telephone',
            'barcodeScanner',
            'date',
            'datetime',
            'time',
            'select',
            'radio',
            'checkboxes',
            'autocomplete',
            'calculation',
          ]
          if (
            !validSummaryElementTypes.some(
              (type) => type === summarizedElement.type,
            )
          ) {
            throw new Error('Summarised element type not valid')
          }
        })
        break
      }
    }
  }

  // Form Event References
  const formEventPropsToValidate = [
    'draftEvents',
    'schedulingEvents',
    'paymentEvents',
    'submissionEvents',
    'approvalEvents',
  ] as const
  for (const formEventProp of formEventPropsToValidate) {
    validateFormEvents({
      formEvents: validatedForm[formEventProp] || [],
      propertyName: formEventProp,
      rootFormElements,
      validatedFormElements: validatedForm.elements,
    })
  }

  return validatedForm
}

function validateWithElementSchema<T extends FormTypes._FormElementBase>(
  element: unknown,
): T {
  const validatedElement = validateJoiSchema<T>(element, elementSchema, {
    stripUnknown: true,
  })

  return validatedElement
}

function validateWithPageElementSchema(
  element: unknown,
): FormTypes.PageElement {
  const validatedElement = validateJoiSchema<FormTypes.PageElement>(
    element,
    pageElementSchema,
    {
      stripUnknown: true,
    },
  )
  return validatedElement
}

function validateConditionalPredicates(
  predicates: Array<unknown>,
): Array<ConditionTypes.ConditionalPredicate> {
  const schema = Joi.array()
    .unique('elementId')
    .min(1)
    .items(ConditionalPredicatesItemSchema)
    .required()

  const validatedPredicates = validateJoiSchema<
    Array<ConditionTypes.ConditionalPredicate>
  >(predicates, schema, {
    stripUnknown: true,
  })
  return validatedPredicates
}

function validateApiRequest(
  apiRequest: unknown,
): FormTypes.FormServerValidation {
  const validatedApiRequest = validateJoiSchema<FormTypes.FormServerValidation>(
    apiRequest,
    apiRequestSchema,
    {
      stripUnknown: true,
    },
  )
  return validatedApiRequest
}

export {
  validateWithFormSchema,
  validateWithElementSchema,
  validateWithPageElementSchema,
  validateConditionalPredicates,
  validateApiRequest,
}
