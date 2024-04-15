import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  requiredSchemas,
  readOnly,
  hint,
  conditionallyShowSchemas,
  lookupSchemas,
  customCssClasses,
  hintPosition,
} from '../property-schemas'

export const type = 'location'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  ...requiredSchemas,
  readOnly,
  hint,
  hintPosition,
  ...lookupSchemas,
  ...conditionallyShowSchemas,
  customCssClasses,
  showStreetAddress: Joi.boolean(),
  formattedAddressElementId: Joi.when('showStreetAddress', {
    is: true,
    then: Joi.string().uuid().required(),
    otherwise: Joi.any().strip(),
  }),
})
