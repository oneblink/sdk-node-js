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
} from '../property-schemas'
import { DYNAMIC_OPTION_TYPE } from '../common'
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
    then: Joi.when('optionsType', {
      is: Joi.invalid(DYNAMIC_OPTION_TYPE),
      then: Joi.array().items(Joi.string().guid()),
      otherwise: Joi.array().items(Joi.string()),
    }),
    otherwise: Joi.when('optionsType', {
      is: Joi.invalid(DYNAMIC_OPTION_TYPE),
      then: Joi.string().guid(),
      otherwise: Joi.string(),
    }),
  }),
  buttons,
  ...optionsSchemas,
  canToggleAll: Joi.when('multi', {
    is: true,
    then: canToggleAll,
    otherwise: Joi.any().strip(),
  }),
})
