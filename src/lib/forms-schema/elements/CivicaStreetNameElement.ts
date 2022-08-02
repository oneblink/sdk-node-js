import Joi from 'joi'
import {
  id,
  name,
  label,
  hint,
  requiredSchemas,
  readOnly,
  conditionallyShowSchemas,
  placeholderValue,
  lookupSchemas,
  customCssClasses,
} from '../property-schemas'

export const type = 'civicaStreetName'

export default Joi.object({
  id,
  name,
  label,
  hint,
  ...requiredSchemas,
  readOnly,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  placeholderValue,
  customCssClasses,
})
