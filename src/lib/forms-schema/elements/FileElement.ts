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
    is: Joi.only(true),
    then: Joi.array()
      .items(Joi.string().label('restricted file type'))
      .required()
      .label('Restricted File Types'),
    otherwise: Joi.any().strip(),
  }),

  ...conditionallyShowSchemas,
})
