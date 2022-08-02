import Joi from 'joi'
import {
  id,
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
  id,
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
