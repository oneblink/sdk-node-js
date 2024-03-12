import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  conditionallyShowSchemas,
  customCssClasses,
} from '../property-schemas'

export const type = 'image'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  ...conditionallyShowSchemas,
  defaultValue: Joi.string().required().uri(),
  decorativeImage: Joi.boolean(),
  customCssClasses,
})
