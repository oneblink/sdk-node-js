import Joi from 'joi'
import {
  baseSchemas,
  name,
  conditionallyShowSchemas,
  customCssClasses,
  readOnlySchemas,
} from '../property-schemas.js'

export const type = 'form'

export default Joi.object({
  ...baseSchemas,
  name,
  ...readOnlySchemas,
  formId: Joi.number().required(),
  ...conditionallyShowSchemas,
  customCssClasses,
})
