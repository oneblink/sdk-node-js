import Joi from 'joi'
import {
  CUSTOM_OPTION_TYPE,
  SEARCH_OPTION_TYPE,
  optionTypes,
  DYNAMIC_OPTION_TYPE,
} from './common'

export const id = Joi.string().guid().required().label('Form Element - Id')
export const name = Joi.string().required().label('Form Element - Name')
export const label = Joi.string().required().label('Form Element - Label')

export const hint = Joi.string().label('Form Element - Hint')
export const required = Joi.bool()
  .default(false)
  .label('Form Element - Required')

export const readOnly = Joi.bool()
  .default(false)
  .label('Form Element - Read Only')
export const placeholderValue = Joi.string().label(
  'Form Element placeholder value',
)

export const buttons = Joi.boolean()
  .label('Form Element - Radio Buttons as Buttons')
  .default(false)

const optionsType = Joi.string()
  .label('Form Element - Options type')
  .default(CUSTOM_OPTION_TYPE)
  .when('type', {
    is: 'autocomplete',
    then: Joi.valid([...optionTypes, SEARCH_OPTION_TYPE]),
    otherwise: Joi.valid(optionTypes),
  })

const dynamicOptionSetId = Joi.when('optionsType', {
  is: DYNAMIC_OPTION_TYPE,
  then: Joi.number().label('Form Element - Dynamic Option Set Id').required(),
  otherwise: Joi.any().strip(),
})
const options = Joi.when('optionsType', {
  is: CUSTOM_OPTION_TYPE,
  then: Joi.array()
    .label('Form Element - Options')
    .unique('id')
    .items(
      Joi.object().keys({
        id: Joi.string().guid().required().label('Form Element - Option Id'),
        value: Joi.string().required().label('Form Element - Option Value'),
        label: Joi.string().required().label('Form Element - Option Label'),
        colour: Joi.string()
          .allow([null, ''])
          .regex(/^#[A-Fa-f0-9]{3}([A-Fa-f0-9]{3})?$/)
          .label('Form Element - Option Colour'),
        attributes: Joi.array().items(
          Joi.object().keys({
            optionIds: Joi.array()
              .required()
              .items(Joi.string())
              .label('Form Element - Attributes Mapping - Element Id'),
            elementId: Joi.string()
              .guid()
              .required()
              .label('Form Element - Option Value - Attribute Option Id'),
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
      elementId: Joi.string()
        .guid()
        .required()
        .label('Form Element - Option Value - Attribute Element Id'),
      attribute: Joi.string()
        .required()
        .label('Form Element - Attributes Mapping - Attribute'),
    }),
  ),
  otherwise: Joi.any().strip(),
})
const conditionallyShowOptions = Joi.when('type', {
  is: Joi.only(['checkboxes', 'radio', 'select', 'autocomplete', 'compliance']),
  then: Joi.boolean()
    .label('Form Element - conditionallyShowOptionsElementIds')
    .default(false),
  otherwise: Joi.any().strip(),
})
const conditionallyShowOptionsElementIds = Joi.when('optionsType', {
  is: CUSTOM_OPTION_TYPE,
  then: Joi.array().items(
    Joi.string()
      .guid()
      .required()
      .label('Form Element - Attributes Mapping - Element Id'),
  ),
  otherwise: Joi.any().strip(),
})
export const optionsSchemas = {
  optionsType,
  dynamicOptionSetId,
  options,
  attributesMapping,
  conditionallyShowOptions,
  conditionallyShowOptionsElementIds,
}

const conditionallyShow = Joi.bool()
  .default(false)
  .label('Form Element - Conditionally Show')
const requiresAllConditionallyShowPredicates = Joi.when('conditionallyShow', {
  is: true,
  then: Joi.bool()
    .default(false)
    .label('Form Element - Requires All Conditionally Show Predicates are Met'),
  otherwise: Joi.any().strip(),
})

export const ConditionalPredicatesItemSchema = Joi.object().keys({
  elementId: Joi.string().guid().required(),
  type: Joi.string()
    .default('OPTIONS')
    .valid(['OPTIONS', 'NUMERIC', 'VALUE', 'BETWEEN']),
  optionIds: Joi.when('type', {
    is: Joi.only('OPTIONS'),
    then: Joi.array().min(1).items(Joi.string()).required(),
    otherwise: Joi.allow(null),
  }),
  operator: Joi.when('type', {
    is: Joi.only('NUMERIC'),
    then: Joi.string().valid(['>', '>=', '===', '!==', '<=', '<']).required(),
    otherwise: Joi.allow(null),
  }),
  value: Joi.when('type', {
    is: Joi.only('NUMERIC'),
    then: Joi.number().required(),
    otherwise: Joi.allow(null),
  }),
  hasValue: Joi.when('type', {
    is: Joi.only('VALUE'),
    then: Joi.boolean().required(),
    otherwise: Joi.allow(null),
  }),
  min: Joi.when('type', {
    is: Joi.only('BETWEEN'),
    then: Joi.number().required(),
    otherwise: Joi.any().strip(),
  }),
  max: Joi.when('type', {
    is: Joi.only('BETWEEN'),
    then: Joi.number().min(Joi.ref('min')).required(),
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
const isDataLookup = Joi.boolean().default(false).label('Data Lookup enabled')
const dataLookupId = Joi.when('isDataLookup', {
  is: true,
  then: Joi.number().required().label('Data Lookup Id'),
  otherwise: Joi.any().strip(),
})

// Element lookup configuration
const isElementLookup = Joi.boolean()
  .default(false)
  .label('Element Lookup enabled')
const elementLookupId = Joi.when('isElementLookup', {
  is: true,
  then: Joi.number().required().label('Element Lookup Id'),
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

export const storageType = Joi.string()
  .label('Storage type')
  .valid(['legacy', 'public', 'private'])
