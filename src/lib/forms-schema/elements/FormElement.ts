import Joi from 'joi'
import {
  baseSchemas,
  name,
  conditionallyShowSchemas,
  customCssClasses,
  readOnly,
} from '../property-schemas.js'

export const type = 'form'

export default Joi.object({
  ...baseSchemas,
  name,
  readOnly,
  formId: Joi.number().required(),
  ...conditionallyShowSchemas,
  customCssClasses,
})
