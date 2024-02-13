import { z } from 'zod'
import { attachment } from '../common'
import {
  baseSchemas,
  name,
  label,
  hint,
  requiredSchemas,
  readOnly,
  ConditionallyShowSchema,
  storageType,
  customCssClasses,
  hintPosition,
} from '../property-schemas'

export default z
  .object({
    type: z.literal('camera'),
    ...baseSchemas,
    name,
    label,
    hint,
    hintPosition,
    ...requiredSchemas,
    readOnly,
    includeTimestampWatermark: z.boolean().default(false),
    storageType,
    defaultValue: attachment.optional(),
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
