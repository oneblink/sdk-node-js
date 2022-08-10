import Joi from 'joi'
import {
  baseSchemas,
  name,
  conditionallyShowSchemas,
  customCssClasses,
} from '../property-schemas'

export const type = 'form'

export default Joi.object({
  ...baseSchemas,
  name,
  formId: Joi.number().required(),
  ...conditionallyShowSchemas,
  customCssClasses,
})
