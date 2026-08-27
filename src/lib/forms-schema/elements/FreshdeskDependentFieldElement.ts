import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  hint,
  requiredSchemas,
  readOnlySchemas,
  conditionallyShowSchemas,
  lookupSchemas,
  optionsSchemas,
  customCssClasses,
  hintPosition,
} from '../property-schemas.js'

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
  ...readOnlySchemas,
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
