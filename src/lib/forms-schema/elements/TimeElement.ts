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

export default Joi.object({
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  placeholderValue,
  defaultValue: Joi.alternatives([Joi.date().iso().raw(), Joi.only(['NOW'])])
    // @ts-expect-error ???
    .error(() => {
      return {
        message:
          '"defaultValue" must be a valid ISO 8601 date or the string "NOW"',
      }
    })
    .label('Form Element - Default Date Value'),
  ...conditionallyShowSchemas,
  ...lookupSchemas,
})
