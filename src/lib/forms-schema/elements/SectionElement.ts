import Joi from 'joi'
import {
  id,
  label,
  name,
  hint,
  conditionallyShowSchemas,
} from '../property-schemas'
import elementSchema from '../element-schema'

export const type = 'section'

const schema: Joi.ObjectSchema = Joi.object({
  id,
  label,
  name,
  hint,
  ...conditionallyShowSchemas,
  isCollapsed: Joi.boolean().default(false),
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
