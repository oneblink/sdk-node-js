import Joi from 'joi'
import { id, name, conditionallyShowSchemas } from '../property-schemas'

export default Joi.object({
  id,
  name,
  formId: Joi.number().required(),
  ...conditionallyShowSchemas,
})
