import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  conditionallyShowSchemas,
  customCssClasses,
} from '../property-schemas'
import { htmlString } from '../common'

export const type = 'html'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  ...conditionallyShowSchemas,
  defaultValue: htmlString.required(),
  customCssClasses,
})
