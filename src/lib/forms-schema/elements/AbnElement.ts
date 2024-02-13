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
  placeholderValue,
  customCssClasses,
  hintPosition,
} from '../property-schemas'

export default z
  .object({
    type: z.literal('abn'),
    ...baseSchemas,
    name,
    label,
    hint,
    hintPosition,
    readOnly,
    ...requiredSchemas,
    placeholderValue,
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
  .and(LookupFormElementSchema)
