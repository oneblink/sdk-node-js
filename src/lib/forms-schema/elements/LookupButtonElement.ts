import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  hint,
  conditionallyShowSchemas,
  lookupSchemas,
  customCssClasses,
  hintPosition,
} from '../property-schemas.js'

export const type = 'lookupButton'

const lookupButtonFormElementDependencySchema = Joi.object()
  .keys({
    elementId: Joi.string().guid().required(),
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
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  customCssClasses,
  elementDependencies: Joi.array()
    .items(lookupButtonFormElementDependencySchema)
    .default([]),
}).or('isDataLookup', 'isElementLookup', {
  isPresent: (resolved) => resolved === true,
})
