import Joi from 'joi'
import {
  id,
  name,
  label,
  required,
  readOnly,
  conditionallyShowSchemas,
} from './property-schemas'
import { base64DataRegex } from '../common'

export default Joi.object({
  id,
  name,
  label,
  required,
  readOnly,
  ...conditionallyShowSchemas,
  defaultValue: Joi.string().required().regex(base64DataRegex, {
    name: 'No Binary Data',
    invert: true,
  }),
  calculation: Joi.string()
    .label('Form Element - Calculation - calculation')
    .required(),
  preCalculationDisplay: Joi.string()
    .label('Form Element - Pre Calculation Display')
    .allow(null)
    .regex(base64DataRegex, {
      name: 'No Binary Data',
      invert: true,
    }),
  displayAsCurrency: Joi.boolean()
    .label('Form Element - Display Calculation as Currency')
    .allow(null),
})
