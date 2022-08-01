import Joi from 'joi'
import {
  id,
  label,
  hint,
  conditionallyShowSchemas,
  customCssClasses,
} from '../property-schemas'
import elementSchema from '../element-schema'

export const type = 'section'

const schema: Joi.ObjectSchema = Joi.object({
  id,
  label,
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
  customCssClasses,
})
export default schema
