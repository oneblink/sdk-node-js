import { z } from 'zod'
import {
  baseSchemas,
  name,
  label,
  readOnly,
  ConditionallyShowSchema,
  customCssClasses,
} from '../property-schemas'

export default z
  .object({
    type: z.literal('summary'),
    ...baseSchemas,
    name,
    label,
    readOnly,
    elementIds: z.string().uuid().array().min(1),
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
