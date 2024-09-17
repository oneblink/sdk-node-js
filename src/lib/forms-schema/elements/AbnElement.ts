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
  placeholderValue,
  customCssClasses,
  hintPosition,
  autocompleteAttributes,
} from '../property-schemas'

export const type = 'abn'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  hint,
  hintPosition,
  readOnly,
  ...requiredSchemas,
  placeholderValue,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  customCssClasses,
  autocompleteAttributes,
})
