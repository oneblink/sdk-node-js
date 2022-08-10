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
import { base64DataRegex } from '../common'

export const type = 'calculation'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  ...requiredSchemas,
  readOnly,
  ...conditionallyShowSchemas,
  defaultValue: Joi.string().required().regex(base64DataRegex, {
    name: 'No Binary Data',
    invert: true,
  }),
  calculation: Joi.string().required(),
  preCalculationDisplay: Joi.string()

    .allow(null)
    .regex(base64DataRegex, {
      name: 'No Binary Data',
      invert: true,
    }),
  displayAsCurrency: Joi.boolean().allow(null),
  customCssClasses,
})
