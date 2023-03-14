import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  hint,
  readOnly,
  requiredSchemas,
  conditionallyShowSchemas,
  lookupSchemas,
  customCssClasses,
  hintPosition,
} from '../property-schemas'

export const type = 'bsb'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  hint,
  hintPosition,
  readOnly,
  ...requiredSchemas,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  defaultValue: Joi.string().regex(/\d{3}-\d{3}/),
  customCssClasses,
})
