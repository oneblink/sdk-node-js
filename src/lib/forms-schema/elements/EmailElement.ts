import Joi from 'joi'
import {
  baseSchemas,
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
  hintPosition,
  autocompleteAttributes,
} from '../property-schemas'

export const type = 'email'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  hint,
  hintPosition,
  ...requiredSchemas,
  readOnly,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  placeholderValue,
  defaultValue: Joi.string().email(),
  ...regexSchemas,
  customCssClasses,
  autocompleteAttributes,
  requiresConfirmation: Joi.boolean().default(false),
})
