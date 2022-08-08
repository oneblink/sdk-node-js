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
  buttons,
  optionsSchemas,
  canToggleAll,
  defaultValueOptionsSingle,
  defaultValueOptionsMultiple,
  customCssClasses,
} from '../property-schemas'

export const type = 'select'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  hint,
  ...requiredSchemas,
  readOnly,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  multi: Joi.boolean(),
  defaultValue: Joi.when('multi', {
    is: true,
    then: defaultValueOptionsMultiple,
    otherwise: defaultValueOptionsSingle,
  }),
  buttons,
  ...optionsSchemas,
  canToggleAll: Joi.when('multi', {
    is: true,
    then: canToggleAll,
    otherwise: Joi.any().strip(),
  }),
  customCssClasses,
})
