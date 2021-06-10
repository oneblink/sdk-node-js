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

export const type = 'checkboxes'

export default Joi.object({
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  defaultValue: Joi.when('optionsType', {
    is: Joi.invalid(DYNAMIC_OPTION_TYPE),
    then: Joi.array().items(Joi.string().guid()),
    otherwise: Joi.array().items(Joi.string()),
  }),
  buttons,
  ...optionsSchemas,
  canToggleAll,
})
