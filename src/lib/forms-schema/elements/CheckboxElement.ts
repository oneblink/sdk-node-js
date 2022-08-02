import Joi from 'joi'
import {
  id,
  name,
  label,
  hint,
  required,
  requiredMessage,
  readOnly,
  conditionallyShowSchemas,
  lookupSchemas,
  buttons,
  optionsSchemas,
  canToggleAll,
  defaultValueOptionsMultiple,
  customCssClasses,
} from '../property-schemas'

export const type = 'checkboxes'

export default Joi.object({
  id,
  name,
  label,
  hint,
  required,
  requiredMessage,
  readOnly,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  defaultValue: defaultValueOptionsMultiple,
  buttons,
  ...optionsSchemas,
  canToggleAll,
  customCssClasses,
})
