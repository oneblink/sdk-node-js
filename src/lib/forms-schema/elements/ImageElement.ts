import Joi from 'joi'
import { id, name, label, conditionallyShowSchemas } from './property-schemas'
export default Joi.object({
  id,
  name,
  label,
  ...conditionallyShowSchemas,
  defaultValue: Joi.string().required().uri(),
})
