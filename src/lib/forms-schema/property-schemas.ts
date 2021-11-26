import Joi from 'joi'
import {
  CUSTOM_OPTION_TYPE,
  SEARCH_OPTION_TYPE,
  optionTypes,
  DYNAMIC_OPTION_TYPE,
  FRESHDESK_FIELD_OPTION_TYPE,
} from './common'

export const id = Joi.string().guid().required()
export const name = Joi.string().required()
export const label = Joi.string().required()

export const hint = Joi.string()
export const required = Joi.bool().default(false)

export const readOnly = Joi.bool().default(false)

export const placeholderValue = Joi.string()

export const buttons = Joi.boolean().default(false)

const optionsType = Joi.string()
  .default(CUSTOM_OPTION_TYPE)
  .when('type', {
    is: 'autocomplete',
    then: Joi.valid(...optionTypes, SEARCH_OPTION_TYPE),
    otherwise: Joi.valid(...optionTypes),
  })

const dynamicOptionSetId = Joi.when('optionsType', {
  is: DYNAMIC_OPTION_TYPE,
  then: Joi.number().required(),
  otherwise: Joi.any().strip(),
})
const options = Joi.when('optionsType', {
  is: CUSTOM_OPTION_TYPE,
  then: Joi.array()
    .unique('id')
    .items(
      Joi.object().keys({
        id: Joi.string().guid().required(),
        value: Joi.string().required(),
        label: Joi.string().required(),
        colour: Joi.string()
          .allow(null, '')
          .regex(/^#[A-Fa-f0-9]{3}([A-Fa-f0-9]{3})?$/),
        attributes: Joi.array().items(
          Joi.object().keys({
            optionIds: Joi.array().required().items(Joi.string()),
            elementId: Joi.string().guid().required(),
          }),
        ),
      }),
    )
    .required(),
  otherwise: Joi.any().strip(),
})
const attributesMapping = Joi.when('optionsType', {
  is: DYNAMIC_OPTION_TYPE,
  then: Joi.array().items(
    Joi.object().keys({
      elementId: Joi.string().guid().required(),
      attribute: Joi.string().required(),
    }),
  ),
  otherwise: Joi.any().strip(),
})
const conditionallyShowOptions = Joi.when('type', {
  is: Joi.valid('checkboxes', 'radio', 'select', 'autocomplete', 'compliance'),
  then: Joi.boolean().default(false),
  otherwise: Joi.any().strip(),
})
const conditionallyShowOptionsElementIds = Joi.when('optionsType', {
  is: CUSTOM_OPTION_TYPE,
  then: Joi.array().items(Joi.string().guid().required()),
  otherwise: Joi.any().strip(),
})
const freshdeskFieldName = Joi.when('optionsType', {
  is: FRESHDESK_FIELD_OPTION_TYPE,
  then: Joi.string().required(),
  otherwise: Joi.any().strip(),
})
export const optionsSchemas = {
  optionsType,
  dynamicOptionSetId,
  options,
  attributesMapping,
  conditionallyShowOptions,
  conditionallyShowOptionsElementIds,
  freshdeskFieldName,
}

const conditionallyShow = Joi.bool().default(false)

const requiresAllConditionallyShowPredicates = Joi.when('conditionallyShow', {
  is: true,
  then: Joi.bool().default(false),
  otherwise: Joi.any().strip(),
})

export const ConditionalPredicatesItemSchema = Joi.object().keys({
  elementId: Joi.string().guid().required(),
  type: Joi.string()
    .default('OPTIONS')
    .valid('OPTIONS', 'NUMERIC', 'VALUE', 'BETWEEN'),
  optionIds: Joi.when('type', {
    is: Joi.valid('OPTIONS'),
    then: Joi.array().min(1).items(Joi.string()).required(),
    otherwise: Joi.allow(null),
  }),
  operator: Joi.when('type', {
    is: Joi.valid('NUMERIC'),
    then: Joi.string().valid('>', '>=', '===', '!==', '<=', '<').required(),
    otherwise: Joi.allow(null),
  }),
  value: Joi.when('type', {
    is: Joi.valid('NUMERIC'),
    then: Joi.number().required(),
    otherwise: Joi.allow(null),
  }),
  hasValue: Joi.when('type', {
    is: Joi.valid('VALUE'),
    then: Joi.boolean().required(),
    otherwise: Joi.allow(null),
  }),
  min: Joi.when('type', {
    is: Joi.valid('BETWEEN'),
    then: Joi.number().required(),
    otherwise: Joi.any().strip(),
  }),
  max: Joi.when('type', {
    is: Joi.valid('BETWEEN'),
    then: Joi.number()
      .min(Joi.ref('min', { render: true }))
      .required(),
    otherwise: Joi.any().strip(),
  }),
})

export const conditionallyShowPredicates = Joi.when('conditionallyShow', {
  is: true,
  then: Joi.array()
    .unique('elementId')
    .min(1)
    .items(ConditionalPredicatesItemSchema)
    .required(),
  otherwise: Joi.any().strip(),
})

// Data lookup configuration
const isDataLookup = Joi.boolean().default(false)
const dataLookupId = Joi.when('isDataLookup', {
  is: true,
  then: Joi.number().required(),
  otherwise: Joi.any().strip(),
})

// Element lookup configuration
const isElementLookup = Joi.boolean().default(false)

const elementLookupId = Joi.when('isElementLookup', {
  is: true,
  then: Joi.number().required(),
  otherwise: Joi.any().strip(),
})

export const lookupSchemas = {
  isDataLookup,
  dataLookupId,
  isElementLookup,
  elementLookupId,
}

export const conditionallyShowSchemas = {
  conditionallyShow,
  requiresAllConditionallyShowPredicates,
  conditionallyShowPredicates,
}

export const storageType = Joi.string().valid('legacy', 'public', 'private')

const regexPattern = Joi.string().custom((value) => {
  if (!value) return
  try {
    new RegExp(value)
    return value
  } catch (err) {
    throw new Error('it was an invalid regex pattern')
  }
})
const regexFlags = Joi.when('regexPattern', {
  is: Joi.string().required(),
  then: Joi.string().regex(/^[dgimsuy]+$/),
  otherwise: Joi.any().strip(),
})
const regexMessage = Joi.string().when('regexPattern', {
  is: Joi.string().required(),
  then: Joi.required(),
  otherwise: Joi.any().strip(),
})

export const regexSchemas = {
  regexPattern,
  regexFlags,
  regexMessage,
}

export const canToggleAll = Joi.boolean().default(false)
