import Joi from 'joi'
import {
  id,
  name,
  label,
  hint,
  required,
  requiredMessage,
  readOnly,
  conditionallyShowSchemas,
  placeholderValue,
  lookupSchemas,
  customCssClasses,
} from '../property-schemas'

export const type = 'pointAddress'

export default Joi.object({
  id,
  name,
  label,
  hint,
  required,
  requiredMessage,
  readOnly,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  placeholderValue,
  stateTerritoryFilter: Joi.array().items(Joi.string()),
  addressTypeFilter: Joi.array().items(Joi.string()),
  customCssClasses,
})
