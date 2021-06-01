import Joi from 'joi'
import { id, name, label, conditionallyShowSchemas } from '../property-schemas'

export default Joi.object({
  id,
  name,
  label,
  ...conditionallyShowSchemas,
  headingType: Joi.number().required().valid(1, 2, 3, 4, 5),
})
