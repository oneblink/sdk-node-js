import { z } from 'zod'
import {
  baseSchemas,
  name,
  label,
  requiredSchemas,
  readOnly,
  hint,
  ConditionallyShowSchema,
  LookupFormElementSchema,
  customCssClasses,
  hintPosition,
} from '../property-schemas'

export default z
  .object({
    type: z.literal('location'),
    ...baseSchemas,
    name,
    label,
    ...requiredSchemas,
    readOnly,
    hint,
    hintPosition,
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
  .and(LookupFormElementSchema)
