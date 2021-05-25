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
} from '../property-schemas'

const nowSchema = Joi.only(['NOW'])
const dateSchema = Joi.date().iso().raw()
const daysOffsetSchema = Joi.number().integer()

const errorFn = (fieldName: string): Joi.ValidationErrorFunction => {
  // @ts-expect-error ???
  return () => ({
    message: `"${fieldName}" must be a valid ISO 8601 date or the string "NOW"`,
  })
}

const fromDate = Joi.alternatives([dateSchema, nowSchema])
  .allow(null)
  .error(errorFn('toDate'))

const toDate = Joi.when('fromDate', {
  is: Joi.date().iso().raw().required().label('Form Element - To Date'),
  // SET MIN IF FROMDATE IS A STATIC DATE
  then: Joi.alternatives([
    dateSchema.min(Joi.ref('fromDate')),
    nowSchema.error(errorFn('toDate')),
  ]),
  otherwise: Joi.alternatives([dateSchema, nowSchema]).error(errorFn('toDate')),
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
    then: daysOffsetSchema.min(Joi.ref('fromDateDaysOffset')),
    otherwise: daysOffsetSchema,
  }),
  otherwise: Joi.any().strip(),
})

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
  defaultValue: Joi.when(dateSchema, {
    then: Joi.when('fromDate', {
      is: dateSchema.required(),
      then: dateSchema.min(Joi.ref('fromDate')),
    }).when('toDate', {
      is: dateSchema.required(),
      then: dateSchema.max(Joi.ref('toDate')),
    }),
    otherwise: Joi.only(['NOW']).error(errorFn('defaultValue')),
  }),
  defaultValueDaysOffset: Joi.when('defaultValue', {
    is: nowSchema.required(),
    then: Joi.number().integer(),
  }),
  ...conditionallyShowSchemas,
  ...lookupSchemas,
})
