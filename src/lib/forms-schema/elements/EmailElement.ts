import Joi from 'joi'
import {
  id,
  name,
  label,
  hint,
  requiredSchemas,
  readOnly,
  conditionallyShowSchemas,
  placeholderValue,
  lookupSchemas,
  regexSchemas,
  customCssClasses,
} from '../property-schemas'

export const type = 'email'

export default Joi.object({
  id,
  name,
  label,
  hint,
  ...requiredSchemas,
  readOnly,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  placeholderValue,
  defaultValue: Joi.string().email(),
  ...regexSchemas,
  customCssClasses,
})
