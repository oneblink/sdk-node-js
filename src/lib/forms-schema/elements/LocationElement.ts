import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  requiredSchemas,
  readOnly,
  hint,
  conditionallyShowSchemas,
  lookupSchemas,
  customCssClasses,
} from '../property-schemas'

export const type = 'location'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  ...requiredSchemas,
  readOnly,
  hint,
  ...lookupSchemas,
  ...conditionallyShowSchemas,
  customCssClasses,
})
