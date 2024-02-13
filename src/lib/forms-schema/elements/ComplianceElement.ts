import { z } from 'zod'
import {
  baseSchemas,
  name,
  label,
  readOnly,
  requiredSchemas,
  hint,
  ConditionallyShowSchema,
  storageType,
  OptionsFormElementSchema,
  LookupFormElementSchema,
  customCssClasses,
  hintPosition,
} from '../property-schemas'

export default z
  .object({
    type: z.literal('compliance'),
    ...baseSchemas,
    name,
    label,
    readOnly,
    ...requiredSchemas,
    hint,
    hintPosition,
    storageType,
    defaultValue: z.string().optional(),
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
  .and(LookupFormElementSchema)
  .and(OptionsFormElementSchema)
