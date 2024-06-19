import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  hint,
  requiredSchemas,
  readOnly,
  conditionallyShowSchemas,
  placeholderValue,
  lookupSchemas,
  customCssClasses,
  hintPosition,
} from '../property-schemas'

export const type = 'pointAddress'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  hint,
  hintPosition,
  ...requiredSchemas,
  readOnly,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  placeholderValue,
  stateTerritoryFilter: Joi.array().items(
    Joi.string().valid(
      'NSW',
      'QLD',
      'VIC',
      'ACT',
      'TAS',
      'SA',
      'NT',
      'WA',
      'OT',
    ),
  ),
  addressTypeFilter: Joi.array().items(Joi.string()),
  customCssClasses,
})
