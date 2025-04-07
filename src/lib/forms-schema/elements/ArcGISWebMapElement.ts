import Joi from 'joi'
import {
  baseSchemas,
  name,
  label,
  conditionallyShowSchemas,
  customCssClasses,
  hint,
  hintPosition,
  requiredSchemas,
  readOnly,
  lookupSchemas,
} from '../property-schemas'

export const type = 'arcGISWebMap'

export default Joi.object({
  ...baseSchemas,
  name,
  label,
  hint,
  hintPosition,
  ...requiredSchemas,
  readOnly,
  ...conditionallyShowSchemas,
  ...lookupSchemas,
  customCssClasses,
  webMapId: Joi.string().required(),
  showLayerPanel: Joi.boolean().default(false),
  defaultValue: Joi.object({
    userInput: Joi.array().items(Joi.object<Record<string, unknown>>({})),
    drawingLayer: Joi.array().items(Joi.object<Record<string, unknown>>({})),
    layers: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        graphics: Joi.array()
          .items(Joi.object<Record<string, unknown>>({}))
          .required(),
      }),
    ),
  }),
})
