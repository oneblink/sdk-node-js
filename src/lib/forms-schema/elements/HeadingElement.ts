import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  conditionallyShowSchemas,
  customCssClasses,
} from '../property-schemas'

export const type = 'heading'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  ...conditionallyShowSchemas,
  headingType: Joi.number().required().valid(1, 2, 3, 4, 5),
  customCssClasses,
})
