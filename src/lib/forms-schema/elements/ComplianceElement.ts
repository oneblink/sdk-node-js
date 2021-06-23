import Joi from 'joi'
import {
  id,
  name,
  label,
  readOnly,
  required,
  hint,
  conditionallyShowSchemas,
  storageType,
  optionsSchemas,
  lookupSchemas,
} from '../property-schemas'
import { DYNAMIC_OPTION_TYPE } from '../common'

export const type = 'compliance'

export default Joi.object({
  id,
  name,
  label,
  readOnly,
  required,
  hint,
  storageType,
  ...optionsSchemas,
  defaultValue: Joi.when('optionsType', {
    is: Joi.invalid(DYNAMIC_OPTION_TYPE),
    then: Joi.string().guid(),
    otherwise: Joi.string(),
  }),
  ...conditionallyShowSchemas,
  lookupSchemas,
})
