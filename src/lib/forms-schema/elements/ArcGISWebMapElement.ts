import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  conditionallyShowSchemas,
  customCssClasses,
} from '../property-schemas'

export const type = 'arcGISWebMap'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  ...conditionallyShowSchemas,
  customCssClasses,
  webMapId: Joi.string().required(),
  showLayerPanel: Joi.boolean().default(false),
})
