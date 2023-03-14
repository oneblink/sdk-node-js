import Joi from 'joi'
import { attachment } from '../common'
import {
  baseSchemas,
  name,
  label,
  hint,
  requiredSchemas,
  readOnly,
  conditionallyShowSchemas,
  storageType,
  customCssClasses,
  hintPosition,
} from '../property-schemas'

export const type = 'camera'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  hint,
  hintPosition,
  ...requiredSchemas,
  readOnly,
  ...conditionallyShowSchemas,
  includeTimestampWatermark: Joi.boolean().default(false),
  storageType,
  defaultValue: attachment,
  customCssClasses,
})
