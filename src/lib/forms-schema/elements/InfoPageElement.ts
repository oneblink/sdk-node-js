import Joi from 'joi'
import {
  baseSchemas,
  name,
  conditionallyShowSchemas,
  customCssClasses,
} from '../property-schemas.js'

export const type = 'infoPage'

export default Joi.object({
  ...baseSchemas,
  name,
  ...conditionallyShowSchemas,
  formId: Joi.number().required(),
  customCssClasses,
})
