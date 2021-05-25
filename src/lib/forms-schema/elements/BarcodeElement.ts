import Joi from 'joi'
import {
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  conditionallyShowSchemas,
  placeholderValue,
  lookupSchemas,
} from '../property-schemas'

export default Joi.object({
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  placeholderValue,
  defaultValue: Joi.string(),
  restrictBarcodeTypes: Joi.boolean()
    .default(false)
    .label('Form Element - Barcode Scanner - restrictBarcodeTypes'),
  restrictedBarcodeTypes: Joi.when('restrictBarcodeTypes', {
    is: true,
    then: Joi.array()
      .items(Joi.string())
      .label('Form Element - Barcode Scanner - restrictedBarcodeTypes')
      .required(),
    otherwise: Joi.any().strip(),
  }),
})
