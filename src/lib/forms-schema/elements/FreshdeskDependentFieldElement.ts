import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  hint,
  requiredSchemas,
  readOnly,
  conditionallyShowSchemas,
  lookupSchemas,
  optionsSchemas,
  customCssClasses,
  hintPosition,
} from '../property-schemas'

export const type = 'freshdeskDependentField'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  hint,
  hintPosition,
  subCategoryLabel: label,
  subCategoryHint: hint,
  itemLabel: label,
  itemHint: hint,
  ...requiredSchemas,
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
