import Joi from 'joi'
import {
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  conditionallyShowSchemas,
  placeholderValue,
  lookupSchemas,
} from './property-schemas'

export default Joi.object({
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  placeholderValue,
  minLength: Joi.number().label('Form Element - Minimum Length').min(0),
  maxLength: Joi.number()
    .label('Form Element - Maximum Length')
    .min(0)
    .when('minLength', {
      is: Joi.number().required(),
      then: Joi.number().min(Joi.ref('minLength')),
    }),
  defaultValue: Joi.when('minLength', {
    is: Joi.number().required(),
    then: Joi.string().when('maxLength', {
      is: Joi.number().required(),
      then: Joi.string().min(Joi.ref('minLength')).max(Joi.ref('maxLength')),
      otherwise: Joi.string().min(Joi.ref('minLength')),
    }),
  })
    .when('maxLength', {
      is: Joi.number().required(),
      then: Joi.string().max(Joi.ref('maxLength')),
      otherwise: Joi.string(),
    })
    .label('Form Element - Default Value'),
})
