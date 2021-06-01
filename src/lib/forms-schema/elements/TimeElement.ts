import Joi from 'joi'
import {
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  conditionallyShowSchemas,
  lookupSchemas,
  placeholderValue,
} from '../property-schemas'

export default Joi.object({
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  placeholderValue,
  defaultValue: Joi.alternatives([Joi.date().iso().raw(), Joi.valid('NOW')]),
  ...conditionallyShowSchemas,
  ...lookupSchemas,
})
