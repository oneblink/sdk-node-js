import { z } from 'zod'
import {
  baseSchemas,
  name,
  label,
  requiredSchemas,
  readOnly,
  hint,
  ConditionallyShowSchema,
  customCssClasses,
  hintPosition,
} from '../property-schemas'

export default z
  .object({
    type: z.literal('captcha'),
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
