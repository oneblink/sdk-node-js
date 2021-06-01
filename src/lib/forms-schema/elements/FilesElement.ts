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

export default Joi.object({
  id,
  name,
  label,
  readOnly,
  hint,
  storageType,
  restrictFileTypes: Joi.boolean().label('Restrict File Types').default(false),
  restrictedFileTypes: Joi.when('restrictFileTypes', {
    is: Joi.valid(true),
    then: Joi.array()
      .items(Joi.string())
      .required()
      .label('Restricted File Types'),
    otherwise: Joi.any().strip(),
  }),
  minEntries: Joi.number()
    .min(0)
    .label('Form Element - Minimum number of files'),
  maxEntries: Joi.number()
    .label('Form Element - Maximum number of files')
    .when('minEntries', {
      is: Joi.number().required().min(0),
      then: Joi.number().min(Joi.ref('minEntries', { render: true })),
      otherwise: Joi.number().min(0),
    }),
  ...conditionallyShowSchemas,
})
