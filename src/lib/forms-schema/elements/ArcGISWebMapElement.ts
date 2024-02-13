import { z } from 'zod'
import {
  baseSchemas,
  name,
  label,
  ConditionallyShowSchema,
  customCssClasses,
} from '../property-schemas'

export default z
  .object({
    type: z.literal('arcGISWebMap'),
    ...baseSchemas,
    name,
    label,
    customCssClasses,
    webMapId: z.string(),
    showLayerPanel: z.boolean().default(false),
  })
  .and(ConditionallyShowSchema)
