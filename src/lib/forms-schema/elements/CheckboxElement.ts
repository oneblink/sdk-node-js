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
  defaultValue: Joi.when('optionsType', {
    is: Joi.invalid(DYNAMIC_OPTION_TYPE),
    then: Joi.array()
      .items(Joi.string().guid())
      .label('Form Element - Default Value'),
    otherwise: Joi.array()
      .items(Joi.string())
      .label('Form Element - Default Value'),
  }),
  buttons,
  ...optionsSchemas,
})
