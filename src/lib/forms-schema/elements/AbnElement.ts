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
  placeholderValue,
} from '../property-schemas'

export const type = 'abn'

export default Joi.object({
  id,
  name,
  label,
  hint,
  readOnly,
  required,
  placeholderValue,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
})
