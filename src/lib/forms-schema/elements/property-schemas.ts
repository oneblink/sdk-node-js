import Joi from 'joi'
import { idSchema } from '../common'
export const id = idSchema.label('Form Element - Id')
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

const ConditionalPredicatesItemSchema = Joi.object().keys({
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

const conditionallyShowPredicates = Joi.when('conditionallyShow', {
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
