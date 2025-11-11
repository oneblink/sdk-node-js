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
} from '../property-schemas'

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
  stateFilter: Joi.array().items(
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
  customCssClasses,
  autocompleteAttributes,
  isDisplayingAddressInformation: Joi.boolean().default(false),
})
