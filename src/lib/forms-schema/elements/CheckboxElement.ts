import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  hint,
  requiredSchemas,
  readOnly,
  conditionallyShowSchemas,
  lookupSchemas,
  buttons,
  optionsSchemas,
  canToggleAll,
  defaultValueOptionsMultiple,
  customCssClasses,
  hintPosition,
} from '../property-schemas.js'

export const type = 'checkboxes'

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
  defaultValue: defaultValueOptionsMultiple,
  buttons,
  ...optionsSchemas,
  canToggleAll,
  customCssClasses,
  requiredAll: Joi.bool(),
})
