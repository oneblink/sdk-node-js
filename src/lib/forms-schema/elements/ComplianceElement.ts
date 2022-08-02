import Joi from 'joi'
import {
  id,
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
} from '../property-schemas'

export const type = 'compliance'

export default Joi.object({
  id,
  name,
  label,
  readOnly,
  ...requiredSchemas,
  hint,
  storageType,
  ...optionsSchemas,
  defaultValue: defaultValueOptionsSingle,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  customCssClasses,
})
