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
  placeholderValue,
  customCssClasses,
} from '../property-schemas'

export const type = 'time'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  hint,
  ...requiredSchemas,
  readOnly,
  placeholderValue,
  defaultValue: Joi.alternatives([Joi.date().iso().raw(), Joi.valid('NOW')]),
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  customCssClasses,
})
