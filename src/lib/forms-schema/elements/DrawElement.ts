import Joi from 'joi'
import { attachment } from '../common'
import {
  id,
  name,
  label,
  hint,
  required,
  requiredMessage,
  readOnly,
  conditionallyShowSchemas,
  storageType,
  customCssClasses,
} from '../property-schemas'

export const type = 'draw'

export default Joi.object({
  id,
  name,
  label,
  hint,
  required,
  requiredMessage,
  readOnly,
  ...conditionallyShowSchemas,
  storageType,
  defaultValue: Joi.when('storageType', {
    is: Joi.valid('legacy', Joi.optional()),
    then: Joi.string().dataUri(),
    otherwise: attachment,
  }),
  customCssClasses,
})
