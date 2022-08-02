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
  defaultValueOptionsSingle,
  customCssClasses,
} from '../property-schemas'

export const type = 'radio'

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
  defaultValue: defaultValueOptionsSingle,
  buttons,
  ...optionsSchemas,
  customCssClasses,
})
