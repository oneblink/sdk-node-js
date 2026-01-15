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
} from '../property-schemas.js'

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
  reverseGeocoding: Joi.object({
    formattedAddressElementId: Joi.string().uuid().required(),
    integrationType: Joi.string().allow('GEOSCAPE').required(),
  }),
})
