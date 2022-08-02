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
  placeholderValue,
  customCssClasses,
} from '../property-schemas'

export const type = 'time'

export default Joi.object({
  id,
  name,
  label,
  hint,
  required,
  requiredMessage,
  readOnly,
  placeholderValue,
  defaultValue: Joi.alternatives([Joi.date().iso().raw(), Joi.valid('NOW')]),
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  customCssClasses,
})
