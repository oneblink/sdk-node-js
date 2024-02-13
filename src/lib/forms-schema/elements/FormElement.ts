import { z } from 'zod'
import {
  baseSchemas,
  name,
  ConditionallyShowSchema,
  customCssClasses,
} from '../property-schemas'

export default z
  .object({
    ...baseSchemas,
    name,
    formId: z.number(),
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
  .and(
    z.union([
      z.object({
        type: z.literal('form'),
      }),
      z.object({
        type: z.literal('infoPage'),
      }),
    ]),
  )
