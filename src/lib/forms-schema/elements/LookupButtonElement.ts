import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  hint,
  requiredSchemas,
  conditionallyShowSchemas,
  lookupSchemas,
  customCssClasses,
  hintPosition,
} from '../property-schemas.js'

export const type = 'lookupButton'

const lookupButtonFormElementDependencySchema = Joi.object()
  .keys({
    elementId: Joi.string().required(),
    type: Joi.string()
      .valid('FORM_ELEMENT', 'REPEATABLE_SET_FORM_ELEMENT', 'FORM_FORM_ELEMENT')
      .required(),
    elementDependency: Joi.when('type', {
      is: Joi.valid('FORM_FORM_ELEMENT', 'REPEATABLE_SET_FORM_ELEMENT'),
      then: Joi.link('#LookupButtonFormElementDependencySchema').required(),
      otherwise: Joi.any().strip(),
    }),
  })
  .id('LookupButtonFormElementDependencySchema')

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  hint,
  hintPosition,
  // should not default to false because `undefined` is valid to support calculating required status based on the dependencies
  required: Joi.bool(),
  requiredMessage: requiredSchemas.requiredMessage,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  customCssClasses,
  elementDependencies: Joi.array()
    .items(lookupButtonFormElementDependencySchema)
    .default([]),
}).or('isDataLookup', 'isElementLookup', {
  isPresent: (resolved) => resolved === true,
})
