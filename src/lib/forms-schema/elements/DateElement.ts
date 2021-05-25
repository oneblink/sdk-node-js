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
  fromDate,
  toDate,
} from '../property-schemas'

export default Joi.object({
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  placeholderValue,
  fromDate,
  toDate,
  defaultValue: Joi.when(Joi.date().iso().raw(), {
    then: Joi.when('fromDate', {
      is: Joi.date().iso().raw().required(),
      then: Joi.date().iso().raw().min(Joi.ref('fromDate')),
    }).when('toDate', {
      is: Joi.date().iso().raw().required(),
      then: Joi.date().iso().raw().max(Joi.ref('toDate')),
    }),
    // @ts-expect-error ???
    otherwise: Joi.only(['NOW']).error(() => {
      return {
        message:
          '"Form Element - Default Date Value" must be a valid ISO 8601 date or the string "NOW"',
      }
    }),
  }).label('Form Element - Default Date Value'),
  ...conditionallyShowSchemas,
  ...lookupSchemas,
})
