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
    type: z.literal('image'),
    ...baseSchemas,
    name,
    label,
    defaultValue: z.string().url(),
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
