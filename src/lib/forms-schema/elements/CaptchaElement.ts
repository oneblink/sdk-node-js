import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  requiredSchemas,
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
  hint,
  hintPosition,
  ...conditionallyShowSchemas,
  customCssClasses,
})
