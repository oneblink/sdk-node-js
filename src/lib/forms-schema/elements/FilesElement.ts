import Joi from 'joi'
import { attachment } from '../common'
import {
  id,
  name,
  label,
  readOnly,
  hint,
  conditionallyShowSchemas,
  storageType,
  lookupSchemas,
} from '../property-schemas'

export const type = 'files'

export default Joi.object({
  id,
  name,
  label,
  readOnly,
  hint,
  storageType,
  restrictFileTypes: Joi.boolean().default(false),
  restrictedFileTypes: Joi.when('restrictFileTypes', {
    is: Joi.valid(true),
    then: Joi.array().items(Joi.string()).required(),
    otherwise: Joi.any().strip(),
  }),
  allowExtensionlessAttachments: Joi.boolean().default(false),
  defaultValue: Joi.when('storageType', {
    is: Joi.valid('legacy', Joi.optional()),
    then: Joi.array().items(
      Joi.object().keys({
        data: Joi.string().required().dataUri(),
        fileName: Joi.string().required(),
      }),
    ),
    otherwise: Joi.array().items(attachment),
  }),
  minEntries: Joi.number().min(0),
  maxEntries: Joi.number().when('minEntries', {
    is: Joi.number().required().min(0),
    then: Joi.number().min(Joi.ref('minEntries', { render: true })),
    otherwise: Joi.number().min(0),
  }),
  ...conditionallyShowSchemas,
  ...lookupSchemas,
})
