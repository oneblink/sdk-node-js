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
} from '../property-schemas'

export const type = 'boolean'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  hint,
  readOnly,
  ...requiredSchemas,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  defaultValue: Joi.boolean().default(false),
  customCssClasses,
})
