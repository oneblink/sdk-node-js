import Joi from 'joi'
import {
  id,
  name,
  label,
  readOnly,
  required,
  hint,
  conditionallyShowSchemas,
  storageType,
  optionsSchemas,
  lookupSchemas,
  defaultValueOptionsSingle,
} from '../property-schemas'

export const type = 'compliance'

export default Joi.object({
  id,
  name,
  label,
  readOnly,
  required,
  hint,
  storageType,
  ...optionsSchemas,
  defaultValue: defaultValueOptionsSingle,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
})
