import Joi from 'joi'
import {
  id,
  name,
  label,
  readOnly,
  hint,
  conditionallyShowSchemas,
  storageType,
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
  defaultValue: Joi.when('storageType', {
    is: Joi.valid('public', 'private'),
    then: Joi.array().items(
      Joi.object().keys({
        id: Joi.string().required(),
        url: Joi.string().required().uri(),
        contentType: Joi.string().required(),
        fileName: Joi.string().required(),
        isPrivate: Joi.boolean().required(),
        s3: Joi.object()
          .keys({
            bucket: Joi.string().required(),
            key: Joi.string().required(),
            region: Joi.string().required(),
          })
          .required(),
      }),
    ),
    otherwise: Joi.array().items(
      Joi.object().keys({
        data: Joi.string().required().dataUri(),
        fileName: Joi.string().required(),
      }),
    ),
  }),
  minEntries: Joi.number().min(0),
  maxEntries: Joi.number().when('minEntries', {
    is: Joi.number().required().min(0),
    then: Joi.number().min(Joi.ref('minEntries', { render: true })),
    otherwise: Joi.number().min(0),
  }),
  ...conditionallyShowSchemas,
})
