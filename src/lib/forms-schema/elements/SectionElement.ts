import { z } from 'zod'
import {
  baseSchemas,
  label,
  hint,
  ConditionallyShowSchema,
  customCssClasses,
  hintPosition,
} from '../property-schemas'
import elementSchema from '../element-schema'

export default z
  .object({
    type: z.literal('section'),
    ...baseSchemas,
    label,
    hint,
    hintPosition,
    isCollapsed: z.boolean().default(false),
    elements: z.lazy(() =>
      elementSchema
        .array()
        // TODO .unique('id')
        .min(1),
    ),
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
