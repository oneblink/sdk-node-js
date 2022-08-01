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
  defaultValueOptionsSingle,
  customCssClasses,
} from '../property-schemas'
import { SEARCH_OPTION_TYPE } from '../common'

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
  defaultValue: defaultValueOptionsSingle,
  searchUrl: Joi.when('optionsType', {
    is: SEARCH_OPTION_TYPE,
    then: Joi.string().required(),
    otherwise: Joi.any().strip(),
  }),
  ...optionsSchemas,
  customCssClasses,
})
