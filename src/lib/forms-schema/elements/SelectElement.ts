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
  buttons,
  optionsSchemas,
  canToggleAll,
  defaultValueOptionsSingle,
  defaultValueOptionsMultiple,
} from '../property-schemas'

export const type = 'select'

export default Joi.object({
  id,
  name,
  label,
  hint,
  required,
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
})
