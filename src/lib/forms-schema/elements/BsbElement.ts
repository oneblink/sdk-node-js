import Joi from 'joi'
import {
  id,
  name,
  label,
  required,
  readOnly,
  lookupSchemas,
} from '../property-schemas'

export const type = 'bsb'

export default Joi.object({
  id,
  name,
  label,
  required,
  readOnly,
  defaultValue: Joi.string().regex(/\d{3}-\d{3}/),
  ...lookupSchemas,
})
