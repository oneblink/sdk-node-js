import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  hint,
  requiredSchemas,
  readOnlySchemas,
  conditionallyShowSchemas,
  lookupSchemas,
  placeholderValue,
  customCssClasses,
  hintPosition,
  autocompleteAttributes,
} from '../property-schemas.js'

export const type = 'time'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  hint,
  hintPosition,
  ...requiredSchemas,
  ...readOnlySchemas,
  placeholderValue,
  defaultValue: Joi.alternatives([Joi.date().iso().raw(), Joi.valid('NOW')]),
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  customCssClasses,
  autocompleteAttributes,
})
