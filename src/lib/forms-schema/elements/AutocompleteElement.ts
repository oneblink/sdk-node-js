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
  placeholderValue,
} from '../property-schemas'
import { DYNAMIC_OPTION_TYPE, SEARCH_OPTION_TYPE } from '../common'

export const type = 'autocomplete'

export default Joi.object({
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  placeholderValue,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  defaultValue: Joi.when('optionsType', {
    is: Joi.invalid(DYNAMIC_OPTION_TYPE),
    then: Joi.string().guid(),
    otherwise: Joi.string(),
  }),
  searchUrl: Joi.when('optionsType', {
    is: SEARCH_OPTION_TYPE,
    then: Joi.string().required(),
    otherwise: Joi.any().strip(),
  }),
  ...optionsSchemas,
})
