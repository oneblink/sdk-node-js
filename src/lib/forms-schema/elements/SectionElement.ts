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
import { getRefineUniquePropInArrayArgs } from '../common'

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
        .min(1)
        .refine(...getRefineUniquePropInArrayArgs('id')),
    ),
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
