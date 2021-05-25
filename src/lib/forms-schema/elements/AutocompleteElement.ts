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
    then: Joi.string().guid().label('Form Element - Default Value'),
    otherwise: Joi.string().label('Form Element - Default Value'),
  }),
  searchUrl: Joi.when('optionsType', {
    is: SEARCH_OPTION_TYPE,
    then: Joi.string().required().label('Search URL'),
    otherwise: Joi.any().strip(),
  }),
  ...optionsSchemas,
})
