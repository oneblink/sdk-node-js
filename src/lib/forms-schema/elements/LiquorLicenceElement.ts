import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  hint,
  requiredSchemas,
  readOnlySchemas,
  conditionallyShowSchemas,
  placeholderValue,
  lookupSchemas,
  customCssClasses,
  hintPosition,
  autocompleteAttributes,
} from '../property-schemas.js'

export const type = 'apiNSWLiquorLicence'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  hint,
  hintPosition,
  ...requiredSchemas,
  ...readOnlySchemas,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  placeholderValue,
  customCssClasses,
  autocompleteAttributes,
})
