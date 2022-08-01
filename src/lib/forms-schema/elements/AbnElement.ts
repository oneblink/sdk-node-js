import Joi from 'joi'
import {
  id,
  name,
  label,
  hint,
  readOnly,
  required,
  requiredMessage,
  conditionallyShowSchemas,
  lookupSchemas,
  placeholderValue,
  customCssClasses,
} from '../property-schemas'

export const type = 'abn'

export default Joi.object({
  id,
  name,
  label,
  hint,
  readOnly,
  required,
  requiredMessage,
  placeholderValue,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  customCssClasses,
})
