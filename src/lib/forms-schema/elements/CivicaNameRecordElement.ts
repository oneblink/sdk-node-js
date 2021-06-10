import Joi from 'joi'
import {
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  conditionallyShowSchemas,
} from '../property-schemas'

export const type = 'civicaNameRecord'

export default Joi.object({
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  ...conditionallyShowSchemas,
  useGeoscapeAddressing: Joi.boolean().default(false),
})
