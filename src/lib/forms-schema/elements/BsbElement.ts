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
  autocompleteAttributes,
} from '../property-schemas.js'

export const type = 'bsb'

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
  defaultValue: Joi.string().regex(/\d{3}-\d{3}/),
  customCssClasses,
  autocompleteAttributes,
})
