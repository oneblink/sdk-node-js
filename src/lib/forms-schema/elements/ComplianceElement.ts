import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  readOnly,
  requiredSchemas,
  hint,
  conditionallyShowSchemas,
  storageType,
  optionsSchemas,
  lookupSchemas,
  defaultValueOptionsSingle,
  customCssClasses,
  hintPosition,
} from '../property-schemas'

export const type = 'compliance'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  readOnly,
  ...requiredSchemas,
  hint,
  hintPosition,
  storageType,
  ...optionsSchemas,
  defaultValue: defaultValueOptionsSingle,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  customCssClasses,
})
