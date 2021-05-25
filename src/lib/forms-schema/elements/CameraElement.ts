import Joi from 'joi'
import {
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  conditionallyShowSchemas,
  storageType,
} from '../property-schemas'

export default Joi.object({
  id,
  name,
  label,
  hint,
  required,
  readOnly,
  ...conditionallyShowSchemas,
  includeTimestampWatermark: Joi.boolean()
    .default(false)
    .label('Camera element - Include timestamp watermark'),
  storageType,
})
