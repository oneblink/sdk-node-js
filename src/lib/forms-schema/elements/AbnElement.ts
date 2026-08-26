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
  placeholderValue,
  customCssClasses,
  hintPosition,
  autocompleteAttributes,
} from '../property-schemas.js'

export const type = 'abn'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  hint,
  hintPosition,
  ...readOnlySchemas,
  ...requiredSchemas,
  placeholderValue,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  customCssClasses,
  autocompleteAttributes,
})
