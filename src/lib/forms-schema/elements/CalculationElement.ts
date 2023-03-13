import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  requiredSchemas,
  readOnly,
  conditionallyShowSchemas,
  customCssClasses,
} from '../property-schemas'
import { htmlString } from '../common'

export const type = 'calculation'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  ...requiredSchemas,
  readOnly,
  ...conditionallyShowSchemas,
  defaultValue: htmlString.required(),
  calculation: Joi.string().required(),
  preCalculationDisplay: htmlString.allow(null),
  displayAsCurrency: Joi.boolean().allow(null),
  customCssClasses,
})
