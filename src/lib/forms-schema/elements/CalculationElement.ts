import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  requiredSchemas,
  conditionallyShowSchemas,
  customCssClasses,
} from '../property-schemas.js'
import { htmlString } from '../common.js'

export const type = 'calculation'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  ...requiredSchemas,
  ...conditionallyShowSchemas,
  defaultValue: htmlString.required(),
  calculation: Joi.string().required(),
  preCalculationDisplay: htmlString.allow(null),
  displayAsCurrency: Joi.boolean().allow(null),
  customCssClasses,
})
