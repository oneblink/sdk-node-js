import Joi from 'joi'
import {
  id,
  name,
  label,
  required,
  requiredMessage,
  readOnly,
  hint,
  conditionallyShowSchemas,
  customCssClasses,
} from '../property-schemas'

export const type = 'captcha'

export default Joi.object({
  id,
  name,
  label,
  required,
  requiredMessage,
  readOnly,
  hint,
  ...conditionallyShowSchemas,
  customCssClasses,
})
