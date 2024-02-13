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
    type: z.literal('bsb'),
    ...baseSchemas,
    name,
    label,
    hint,
    hintPosition,
    readOnly,
    ...requiredSchemas,
    defaultValue: z
      .string()
      .regex(/\d{3}-\d{3}/)
      .optional(),
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
  .and(LookupFormElementSchema)
