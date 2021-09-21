import Joi from 'joi'
import {
  id,
  name,
  label,
  required,
  readOnly,
  lookupSchemas,
  placeholderValue,
} from '../property-schemas'

export const type = 'bsb'

export default Joi.object({
  id,
  name,
  label,
  required,
  readOnly,
  placeholderValue,
  defaultValue: Joi.string(),
  ...lookupSchemas,
})
