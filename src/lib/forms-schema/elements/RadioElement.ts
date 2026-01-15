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
  defaultValueOptionsSingle,
  customCssClasses,
  hintPosition,
} from '../property-schemas.js'

export const type = 'radio'

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
  defaultValue: defaultValueOptionsSingle,
  buttons,
  ...optionsSchemas,
  customCssClasses,
})
