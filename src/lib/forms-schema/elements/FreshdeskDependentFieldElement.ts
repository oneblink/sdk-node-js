import Joi from 'joi'
import {
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  conditionallyShowSchemas,
  lookupSchemas,
  optionsSchemas,
  customCssClasses,
} from '../property-schemas'

export const type = 'freshdeskDependentField'

export default Joi.object({
  id,
  name,
  label,
  hint,
  subCategoryLabel: label,
  subCategoryHint: hint,
  itemLabel: label,
  itemHint: hint,
  required,
  readOnly,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  defaultValue: Joi.object().keys({
    category: Joi.string(),
    subCategory: Joi.string(),
    item: Joi.string(),
  }),
  ...optionsSchemas,
  customCssClasses,
})
