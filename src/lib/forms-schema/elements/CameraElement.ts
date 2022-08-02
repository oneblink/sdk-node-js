import Joi from 'joi'
import { attachment } from '../common'
import {
  id,
  name,
  label,
  hint,
  requiredSchemas,
  readOnly,
  conditionallyShowSchemas,
  storageType,
  customCssClasses,
} from '../property-schemas'

export const type = 'camera'

export default Joi.object({
  id,
  name,
  label,
  hint,
  ...requiredSchemas,
  readOnly,
  ...conditionallyShowSchemas,
  includeTimestampWatermark: Joi.boolean().default(false),
  storageType,
  defaultValue: Joi.when('storageType', {
    is: Joi.valid('legacy', Joi.optional()),
    then: Joi.string().dataUri(),
    otherwise: attachment,
  }),
  customCssClasses,
})
