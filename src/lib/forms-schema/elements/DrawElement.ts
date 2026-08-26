import Joi from 'joi'
import { attachment } from '../common.js'
import {
  baseSchemas,
  name,
  label,
  hint,
  requiredSchemas,
  readOnlySchemas,
  conditionallyShowSchemas,
  storageType,
  customCssClasses,
  hintPosition,
} from '../property-schemas.js'

export const type = 'draw'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  hint,
  hintPosition,
  ...requiredSchemas,
  ...readOnlySchemas,
  ...conditionallyShowSchemas,
  storageType,
  defaultValue: attachment,
  customCssClasses,
})
