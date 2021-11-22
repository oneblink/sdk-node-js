import Joi from 'joi'
import {
  id,
  name,
  label,
  required,
  readOnly,
  hint,
  conditionallyShowSchemas,
} from '../property-schemas'

export const type = 'file'

export default Joi.object({
  id,
  name,
  label,
  required,
  readOnly,
  hint,
  restrictFileTypes: Joi.boolean().default(false),
  restrictedFileTypes: Joi.when('restrictFileTypes', {
    is: Joi.valid(true),
    then: Joi.array().items(Joi.string()).required(),
    otherwise: Joi.any().strip(),
  }),
  allowExtensionlessAttachments: Joi.boolean().default(false),

  ...conditionallyShowSchemas,
})
