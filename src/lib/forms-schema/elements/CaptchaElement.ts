import Joi from 'joi'
import {
  id,
  name,
  label,
  required,
  readOnly,
  hint,
  conditionallyShowSchemas,
} from '../property-schemas'

export const type = 'captcha'

export default Joi.object({
  id,
  name,
  label,
  required,
  readOnly,
  hint,
  ...conditionallyShowSchemas,
})
