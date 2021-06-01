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

export default Joi.object({
  id,
  name,
  label,
  required,
  readOnly,
  hint,
  restrictFileTypes: Joi.boolean().label('Restrict File Types').default(false),
  restrictedFileTypes: Joi.when('restrictFileTypes', {
    is: Joi.valid(true),
    then: Joi.array()
      .items(Joi.string())
      .required()
      .label('Restricted File Types'),
    otherwise: Joi.any().strip(),
  }),

  ...conditionallyShowSchemas,
})
