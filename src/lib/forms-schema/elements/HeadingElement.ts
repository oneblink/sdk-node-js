import { z } from 'zod'
import {
  baseSchemas,
  name,
  label,
  ConditionallyShowSchema,
  customCssClasses,
} from '../property-schemas'

export const type = ''

export default z
  .object({
    type: z.literal('heading'),
    ...baseSchemas,
    name,
    label,
    headingType: z.nativeEnum({
      h1: 1,
      h2: 2,
      h3: 3,
      h4: 4,
      h5: 5,
    }),
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
