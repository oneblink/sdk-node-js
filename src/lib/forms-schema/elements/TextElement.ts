import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  hint,
  requiredSchemas,
  readOnly,
  conditionallyShowSchemas,
  placeholderValue,
  lookupSchemas,
  regexSchemas,
  customCssClasses,
  hintPosition,
  autocompleteAttributes,
} from '../property-schemas'

export const textElementType = 'text'
export const textareaElementType = 'textarea'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  hint,
  hintPosition,
  ...requiredSchemas,
  readOnly,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  placeholderValue,
  minLength: Joi.number().min(0),
  maxLength: Joi.number()
    .min(0)
    .when('minLength', {
      is: Joi.number().required(),
      then: Joi.number().min(Joi.ref('minLength', { render: true })),
    }),
  defaultValue: Joi.when('minLength', {
    is: Joi.number().required(),
    then: Joi.string().when('maxLength', {
      is: Joi.number().required(),
      then: Joi.string()
        .min(Joi.ref('minLength', { render: true }))
        .max(Joi.ref('maxLength', { render: true })),
      otherwise: Joi.string().min(Joi.ref('minLength', { render: true })),
    }),
  }).when('maxLength', {
    is: Joi.number().required(),
    then: Joi.string().max(Joi.ref('maxLength', { render: true })),
    otherwise: Joi.string(),
  }),
  ...regexSchemas,
  customCssClasses,
  autocompleteAttributes,
})
