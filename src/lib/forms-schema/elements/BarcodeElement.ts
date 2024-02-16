import { z } from 'zod'
import {
  baseSchemas,
  name,
  label,
  hint,
  requiredSchemas,
  readOnly,
  ConditionallyShowSchema,
  placeholderValue,
  LookupFormElementSchema,
  RegexFormElementSchema,
  customCssClasses,
  hintPosition,
} from '../property-schemas'

export default z
  .object({
    type: z.literal('barcodeScanner'),
    ...baseSchemas,
    name,
    label,
    hint,
    hintPosition,
    ...requiredSchemas,
    readOnly,
    placeholderValue,
    defaultValue: z.string().optional(),
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
  .and(LookupFormElementSchema)
  .and(RegexFormElementSchema)
  .and(
    z.union([
      z.object({
        restrictBarcodeTypes: z.literal(false).default(false),
      }),
      z.object({
        restrictBarcodeTypes: z.literal(true),
        restrictedBarcodeTypes: z.string().array(),
      }),
    ]),
  )
