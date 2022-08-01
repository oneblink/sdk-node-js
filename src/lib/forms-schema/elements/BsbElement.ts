import Joi from 'joi'
import {
  id,
  name,
  label,
  hint,
  readOnly,
  required,
  conditionallyShowSchemas,
  lookupSchemas,
  customCssClasses,
} from '../property-schemas'

export const type = 'bsb'

export default Joi.object({
  id,
  name,
  label,
  hint,
  readOnly,
  required,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  defaultValue: Joi.string().regex(/\d{3}-\d{3}/),
  customCssClasses,
})
