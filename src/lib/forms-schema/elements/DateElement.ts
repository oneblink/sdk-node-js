import Joi from 'joi'
import {
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  conditionallyShowSchemas,
  lookupSchemas,
  placeholderValue,
  customCssClasses,
} from '../property-schemas'

const nowSchema = Joi.valid('NOW')
const dateSchema = Joi.date().iso().raw()
const daysOffsetSchema = Joi.number().integer()

const fromDate = Joi.alternatives([dateSchema, nowSchema]).allow(null)
const toDate = Joi.when('fromDate', {
  is: Joi.date().iso().raw().required(),
  // SET MIN IF FROMDATE IS A STATIC DATE
  then: Joi.alternatives([
    dateSchema.min(Joi.ref('fromDate', { render: true })),
    nowSchema,
  ]),
  otherwise: Joi.alternatives([dateSchema, nowSchema]),
}).allow(null)

const fromDateDaysOffset = Joi.when('fromDate', {
  is: nowSchema.required(),
  then: daysOffsetSchema,
  otherwise: Joi.any().strip(),
})
const toDateDaysOffset = Joi.when('toDate', {
  is: nowSchema.required(),
  then: Joi.when('fromDateDaysOffset', {
    is: daysOffsetSchema.required(),
    then: daysOffsetSchema.min(Joi.ref('fromDateDaysOffset', { render: true })),
    otherwise: daysOffsetSchema,
  }),
  otherwise: Joi.any().strip(),
})

export const dateElementType = 'date'
export const datetimeElementType = 'datetime'

export default Joi.object({
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  placeholderValue,
  fromDate,
  fromDateDaysOffset,
  toDate,
  toDateDaysOffset,
  defaultValue: Joi.alternatives([
    dateSchema
      .when('fromDate', {
        is: dateSchema.required(),
        then: dateSchema.min(Joi.ref('fromDate', { render: true })),
      })
      .when('toDate', {
        is: dateSchema.required(),
        then: dateSchema.max(Joi.ref('toDate', { render: true })),
      }),
    nowSchema,
  ]),
  defaultValueDaysOffset: Joi.when('defaultValue', {
    is: nowSchema.required(),
    then: Joi.number().integer(),
  }),
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  customCssClasses,
})
