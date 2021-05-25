import Joi from 'joi'
import {
  id,
  name,
  label,
  required,
  readOnly,
  conditionallyShowSchemas,
} from '../property-schemas'

export default Joi.object({
  id,
  name,
  label,
  required,
  readOnly,
  elementIds: Joi.array()
    .required()
    .label('Form Element - Summarised Element ID')
    .min(1)
    .items(Joi.string().uuid().required()),
  ...conditionallyShowSchemas,
})
