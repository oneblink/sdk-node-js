import Joi from 'joi'
import { attachment } from '../common.js'
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
  editableByApprover,
} from '../property-schemas.js'

export const type = 'draw'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  hint,
  hintPosition,
  ...requiredSchemas,
  readOnly,
  ...conditionallyShowSchemas,
  storageType,
  defaultValue: attachment,
  customCssClasses,
  editableByApprover,
})
