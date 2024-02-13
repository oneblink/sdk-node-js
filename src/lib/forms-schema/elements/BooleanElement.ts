import { z } from 'zod'
import {
  baseSchemas,
  name,
  label,
  hint,
  readOnly,
  requiredSchemas,
  ConditionallyShowSchema,
  LookupFormElementSchema,
  customCssClasses,
  hintPosition,
} from '../property-schemas'

export default z
  .object({
    type: z.literal('boolean'),
    ...baseSchemas,
    name,
    label,
    hint,
    hintPosition,
    readOnly,
    ...requiredSchemas,
    defaultValue: z.boolean().default(false),
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
  .and(LookupFormElementSchema)
