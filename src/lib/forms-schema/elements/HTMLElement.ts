import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  conditionallyShowSchemas,
  customCssClasses,
} from '../property-schemas.js'
import { htmlString } from '../common.js'

export const type = 'html'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  ...conditionallyShowSchemas,
  defaultValue: htmlString.required(),
  customCssClasses,
})
