import Joi from 'joi'
import {
  id,
  name,
  conditionallyShowSchemas,
  customCssClasses,
} from '../property-schemas'

export const type = 'form'

export default Joi.object({
  id,
  name,
  formId: Joi.number().required(),
  ...conditionallyShowSchemas,
  customCssClasses,
})
