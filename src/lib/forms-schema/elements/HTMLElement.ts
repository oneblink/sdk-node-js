import Joi from 'joi'
import { id, name, label, conditionallyShowSchemas } from '../property-schemas'
import { base64DataRegex } from '../common'

export const type = 'html'

export default Joi.object({
  id,
  name,
  label,
  ...conditionallyShowSchemas,
  defaultValue: Joi.string().required().regex(base64DataRegex, {
    name: 'No Binary Data',
    invert: true,
  }),
})
