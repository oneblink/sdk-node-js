import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  readOnly,
  conditionallyShowSchemas,
  customCssClasses,
} from '../property-schemas'

export const type = 'summary'

export default Joi.object({
  ...baseSchemas,
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
