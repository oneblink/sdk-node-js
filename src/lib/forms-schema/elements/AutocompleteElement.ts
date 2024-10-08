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
  placeholderValue,
  defaultValueOptionsSingle,
  customCssClasses,
  hintPosition,
  autocompleteAttributes,
} from '../property-schemas'
import { SEARCH_OPTION_TYPE } from '../common'

export const type = 'autocomplete'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  hint,
  hintPosition,
  ...requiredSchemas,
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
  searchQuerystringParameter: Joi.when('optionsType', {
    is: SEARCH_OPTION_TYPE,
    then: Joi.string(),
    otherwise: Joi.any().strip(),
  }),
  ...optionsSchemas,
  customCssClasses,
  autocompleteAttributes,
})
