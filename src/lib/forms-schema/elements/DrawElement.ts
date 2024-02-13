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
    type: z.literal('draw'),
    ...baseSchemas,
    name,
    label,
    hint,
    hintPosition,
    ...requiredSchemas,
    readOnly,
    storageType,
    defaultValue: attachment.optional(),
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
