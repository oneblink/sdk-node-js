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
  regexSchemas,
  customCssClasses,
} from '../property-schemas'

export const type = 'barcodeScanner'

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
  defaultValue: Joi.string(),
  restrictBarcodeTypes: Joi.boolean().default(false),
  restrictedBarcodeTypes: Joi.when('restrictBarcodeTypes', {
    is: true,
    then: Joi.array().items(Joi.string()).required(),
    otherwise: Joi.any().strip(),
  }),
  ...regexSchemas,
  customCssClasses,
})
