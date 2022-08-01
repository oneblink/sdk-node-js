import Joi from 'joi'
import {
  id,
  name,
  label,
  conditionallyShowSchemas,
  customCssClasses,
} from '../property-schemas'

export const type = 'image'

export default Joi.object({
  id,
  name,
  label,
  ...conditionallyShowSchemas,
  defaultValue: Joi.string().required().uri(),
  customCssClasses,
})
