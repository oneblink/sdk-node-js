import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  hint,
  readOnly,
  conditionallyShowSchemas,
  customCssClasses,
  hintPosition,
} from '../property-schemas'
import elementSchema from '../element-schema'

// Think this needs to be a variable because of recursive dependency

export const type = 'repeatableSet'

const schema: Joi.ObjectSchema = Joi.object({
  ...baseSchemas,
  name,
  label,
  hint,
  hintPosition,
  readOnly,
  ...conditionallyShowSchemas,
  minSetEntries: Joi.alternatives([
    Joi.number().min(0),
    Joi.object({
      type: Joi.string().valid('FORM_ELEMENT').required(),
      elementId: Joi.string().uuid().required(),
    }),
  ]),
  maxSetEntries: Joi.alternatives([
    Joi.number().when('minSetEntries', {
      is: Joi.number().required().min(0),
      then: Joi.number().min(Joi.ref('minSetEntries', { render: true })),
      otherwise: Joi.number().min(0),
    }),
    Joi.object({
      type: Joi.string().valid('FORM_ELEMENT').required(),
      elementId: Joi.string().uuid().required(),
    }),
  ]),
  addSetEntryLabel: Joi.string(),
  removeSetEntryLabel: Joi.string(),
  layout: Joi.string()
    .valid('SINGLE_ADD_BUTTON', 'MULTIPLE_ADD_BUTTONS')
    .optional(),
  elements: Joi.array()
    .items(
      Joi.custom((value) => {
        if (!value) return
        const result = elementSchema.validate(value)
        if (result.error) {
          throw result.error
        }
        return result.value
      }),
    )
    .required()
    .min(1)
    .unique('name', { ignoreUndefined: true })
    .unique('id'),
  customCssClasses,
})
export default schema
