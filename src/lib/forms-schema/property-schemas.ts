import Joi from 'joi'
import {
  htmlString,
  CUSTOM_OPTION_TYPE,
  SEARCH_OPTION_TYPE,
  optionTypes,
  DYNAMIC_OPTION_TYPE,
  FRESHDESK_FIELD_OPTION_TYPE,
} from './common'

export const id = Joi.string().guid().required()
export const name = Joi.string().required().trim()
export const label = Joi.string().required()
export const meta = Joi.string().custom((value) => {
  JSON.parse(value)
  return value
})

/**
 * This property is spread onto every element schema. Any new properties that
 * will be on ALL elements can be safely added here.
 */
export const baseSchemas = {
  id,
  meta,
  isHidden: Joi.boolean(),
}

export const hint = htmlString

export const hintPosition = Joi.string()
  .custom((value, helpers) => {
    if (!value) {
      return 'TOOLTIP'
    }

    if (value === 'BELOW_LABEL' || value === 'TOOLTIP') {
      return value
    }

    return helpers.error('string.hintPosition')
  })
  .messages({
    'string.hintPosition': '{{#label}} must be one of [BELOW_LABEL, TOOLTIP]',
  })

const required = Joi.bool().default(false)
const requiredMessage = Joi.string().trim()

export const requiredSchemas = {
  required,
  requiredMessage,
}

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
        value: Joi.string().required().trim(),
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
        displayAlways: Joi.boolean().default(false),
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
export const defaultValueOptionsSingle = Joi.when('optionsType', {
  is: Joi.invalid(DYNAMIC_OPTION_TYPE, FRESHDESK_FIELD_OPTION_TYPE),
  then: Joi.string().guid(),
  otherwise: Joi.string(),
})
export const defaultValueOptionsMultiple = Joi.when('optionsType', {
  is: Joi.invalid(DYNAMIC_OPTION_TYPE, FRESHDESK_FIELD_OPTION_TYPE),
  then: Joi.array().items(Joi.string().guid()),
  otherwise: Joi.array().items(Joi.string()),
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

const ConditionalPredicatesItemBaseSchema = Joi.object().keys({
  elementId: Joi.string().guid().required(),
  type: Joi.string()
    .default('OPTIONS')
    .valid(
      'OPTIONS',
      'NUMERIC',
      'VALUE',
      'BETWEEN',
      'FORM',
      'ADDRESS_PROPERTY',
    ),
  optionIds: Joi.when('type', {
    is: Joi.valid('OPTIONS'),
    then: Joi.array().min(1).items(Joi.string()).required(),
    otherwise: Joi.any().strip(),
  }),
  operator: Joi.when('type', {
    is: Joi.valid('NUMERIC'),
    then: Joi.string().valid('>', '>=', '===', '!==', '<=', '<').required(),
    otherwise: Joi.any().strip(),
  }),
  compareWith: Joi.when('type', {
    is: Joi.valid('NUMERIC'),
    then: Joi.valid('ELEMENT', 'VALUE'),
    otherwise: Joi.any().strip(),
  }),
  value: Joi.when('type', {
    is: Joi.valid('NUMERIC'),
    then: Joi.when('compareWith', {
      is: Joi.valid('ELEMENT').required(),
      then: Joi.string().guid().required(),
      otherwise: Joi.number().required(),
    }),
    otherwise: Joi.any().strip(),
  }),
  hasValue: Joi.when('type', {
    is: Joi.valid('VALUE'),
    then: Joi.boolean().required(),
    otherwise: Joi.any().strip(),
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
  predicate: Joi.when('type', {
    is: Joi.valid('FORM'),
    then: Joi.link('#ConditionalPredicatesItemSchema'),
    otherwise: Joi.any().strip(),
  }),
  definition: Joi.when('type', {
    is: Joi.valid('ADDRESS_PROPERTY'),
    then: Joi.object()
      .keys({
        property: Joi.string().valid('IS_PO_BOX_ADDRESS', 'STATE_EQUALITY'),
        value: Joi.when('property', {
          switch: [
            {
              is: Joi.valid('IS_PO_BOX_ADDRESS'),
              then: Joi.boolean().required(),
            },
            {
              is: Joi.valid('STATE_EQUALITY'),
              then: Joi.string()
                .valid(
                  'NSW',
                  'VIC',
                  'QLD',
                  'SA',
                  'WA',
                  'TAS',
                  'ACT',
                  'NT',
                  'OT',
                )
                .required(),
            },
          ],
        }),
      })
      .required(),
  }),
})

export const ConditionalPredicatesItemSchema = Joi.object()
  .keys({
    type: Joi.string().valid('REPEATABLESET'),
    repeatableSetPredicate: Joi.when('type', {
      is: Joi.valid('REPEATABLESET'),
      then: ConditionalPredicatesItemBaseSchema,
      otherwise: Joi.any().strip(),
    }),
  })
  .concat(ConditionalPredicatesItemBaseSchema)
  .id('ConditionalPredicatesItemSchema')

export const conditionallyShowPredicates = Joi.when('conditionallyShow', {
  is: true,
  then: Joi.array().min(1).items(ConditionalPredicatesItemSchema).required(),
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

const lookupButton = Joi.object({
  icon: Joi.string(),
  label: Joi.string(),
})

export const lookupSchemas = {
  isDataLookup,
  dataLookupId,
  isElementLookup,
  elementLookupId,
  lookupButton,
}

export const conditionallyShowSchemas = {
  conditionallyShow,
  requiresAllConditionallyShowPredicates,
  conditionallyShowPredicates,
}

export const storageType = Joi.string()
  .custom((value, helpers) => {
    // Need to keep this here so that we still allow old forms to
    // be saved without throwing validation errors
    if (value === 'legacy') {
      return 'private'
    }

    if (value === 'private' || value === 'public') {
      return value
    }

    return helpers.error('string.storageType')
  })
  .messages({
    'string.storageType': '{{#label}} must be one of [public, private]',
  })

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

export const customCssClasses = Joi.array().items(
  //regex from here https://stackoverflow.com/a/449000
  Joi.string().regex(/^-?[_a-z]+[_a-z0-9-]*$/i),
)

export const autocompleteAttributes = Joi.array().items(
  Joi.string().regex(/^-?[_a-z0-9-]*$/i),
)
