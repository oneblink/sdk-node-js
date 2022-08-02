import Joi from 'joi'
import {
  id,
  name,
  label,
  readOnly,
  conditionallyShowSchemas,
  customCssClasses,
} from '../property-schemas'

export const type = 'summary'

export default Joi.object({
  id,
  name,
  label,
  readOnly,
  elementIds: Joi.array()
    .required()

    .min(1)
    .items(Joi.string().uuid().required()),
  ...conditionallyShowSchemas,
  customCssClasses,
})
