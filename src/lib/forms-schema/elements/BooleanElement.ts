import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  hint,
  readOnlySchemas,
  requiredSchemas,
  conditionallyShowSchemas,
  lookupSchemas,
  customCssClasses,
  hintPosition,
} from '../property-schemas.js'

export const type = 'boolean'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  hint,
  hintPosition,
  ...readOnlySchemas,
  ...requiredSchemas,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  defaultValue: Joi.boolean().default(false),
  displayAsCheckbox: Joi.boolean().allow(null),
  customCssClasses,
})
