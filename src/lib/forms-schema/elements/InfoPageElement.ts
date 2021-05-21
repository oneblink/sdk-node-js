import Joi from 'joi'
import { id, name, conditionallyShowSchemas } from './property-schemas'
export default Joi.object({
  id,
  name,
  ...conditionallyShowSchemas,
  defaultValue: Joi.string().required().uri(),
  formId: Joi.number().label('Form Id').required(),
})
