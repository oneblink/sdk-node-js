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
  canToggleAll,
  defaultValueOptionsSingle,
  defaultValueOptionsMultiple,
  customCssClasses,
  hintPosition,
  autocompleteAttributes,
} from '../property-schemas'

export const type = 'select'

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
  multi: Joi.boolean().default(false),
  defaultValue: Joi.when('multi', {
    is: true,
    then: defaultValueOptionsMultiple,
    otherwise: defaultValueOptionsSingle,
  }),
  ...optionsSchemas,
  canToggleAll: Joi.when('multi', {
    is: true,
    then: canToggleAll,
    otherwise: Joi.any().strip(),
  }),
  customCssClasses,
  autocompleteAttributes,
})
