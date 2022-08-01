import Joi from 'joi'
import {
  id,
  name,
  label,
  required,
  readOnly,
  hint,
  conditionallyShowSchemas,
  lookupSchemas,
  customCssClasses,
} from '../property-schemas'

export const type = 'location'

export default Joi.object({
  id,
  name,
  label,
  required,
  readOnly,
  hint,
  ...lookupSchemas,
  ...conditionallyShowSchemas,
  customCssClasses,
})
