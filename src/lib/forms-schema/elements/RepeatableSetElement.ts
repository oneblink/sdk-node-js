import Joi from 'joi'
import {
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  conditionallyShowSchemas,
} from '../property-schemas'
import elementSchema from '../element-schema'

// Think this needs to be a variable because of recursive dependency

export const type = 'repeatableSet'

const schema: Joi.ObjectSchema = Joi.object({
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  ...conditionallyShowSchemas,
  minSetEntries: Joi.number().min(0),
  maxSetEntries: Joi.number().when('minSetEntries', {
    is: Joi.number().required().min(0),
    then: Joi.number().min(Joi.ref('minSetEntries', { render: true })),
    otherwise: Joi.number().min(0),
  }),
  addSetEntryLabel: Joi.string(),
  removeSetEntryLabel: Joi.string(),
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
})
export default schema
