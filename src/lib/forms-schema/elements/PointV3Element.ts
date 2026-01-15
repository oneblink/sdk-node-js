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
  autocompleteAttributes,
} from '../property-schemas.js'

export const type = 'pointAddressV3'

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
  addressTypeFilter: Joi.array().items(
    Joi.string().valid('physical', 'mailing'),
  ),
  datasetFilter: Joi.array().items(
    Joi.string().valid('gnaf', 'gnaflive', 'mailAddress'),
  ),
  customCssClasses,
  autocompleteAttributes,
  isDisplayingAddressInformation: Joi.boolean().default(false),
  excludeAliases: Joi.boolean().default(false),
})
