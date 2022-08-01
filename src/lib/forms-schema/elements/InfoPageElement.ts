import Joi from 'joi'
import {
  id,
  name,
  conditionallyShowSchemas,
  customCssClasses,
} from '../property-schemas'

export const type = 'infoPage'

export default Joi.object({
  id,
  name,
  ...conditionallyShowSchemas,
  formId: Joi.number().required(),
  customCssClasses,
})
