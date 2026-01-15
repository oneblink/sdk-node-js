import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  requiredSchemas,
  readOnly,
  hint,
  conditionallyShowSchemas,
  customCssClasses,
  hintPosition,
} from '../property-schemas.js'

export const type = 'captcha'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  ...requiredSchemas,
  readOnly,
  hint,
  hintPosition,
  ...conditionallyShowSchemas,
  customCssClasses,
})
