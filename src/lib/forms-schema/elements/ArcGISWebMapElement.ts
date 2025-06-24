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
  webMapId: Joi.string(),
  basemapId: Joi.string(),
  showLayerPanel: Joi.boolean().default(false),
  allowedDrawingTools: Joi.array().items(
    Joi.object({
      type: Joi.string().required(),
      graphicAttributeOptions: Joi.array().items(
        Joi.object({
          id: Joi.string().required(),
          label: Joi.string().required(),
          value: Joi.string().required(),
          description: Joi.string(),
        }),
      ),
    }),
  ),
  addressSearchWidgetEnabled: Joi.boolean().default(false),
  homeWidgetEnabled: Joi.boolean().default(false),
  defaultValue: Joi.object({
    userInput: Joi.array().items(
      Joi.object<Record<string, unknown>>().unknown(true),
    ),
    drawingLayer: Joi.array().items(
      Joi.object<Record<string, unknown>>().unknown(true),
    ),
    layers: Joi.array().items(
      Joi.object({
        id: Joi.string().required(),
        title: Joi.string().required(),
        visible: Joi.boolean().required(),
        graphics: Joi.array()
          .items(Joi.object<Record<string, unknown>>().unknown(true))
          .required(),
      }),
    ),
    view: Joi.object({
      zoom: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    }),
  }),
})
