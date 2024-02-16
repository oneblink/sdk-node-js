import { z } from 'zod'
import { attachment } from '../common'
import {
  baseSchemas,
  name,
  label,
  readOnly,
  hint,
  ConditionallyShowSchema,
  storageType,
  LookupFormElementSchema,
  customCssClasses,
  hintPosition,
  refineRange,
  refineMaxGreaterThanMin,
} from '../property-schemas'

export default z
  .object({
    type: z.literal('files'),
    ...baseSchemas,
    name,
    label,
    readOnly,
    hint,
    hintPosition,
    storageType,
    allowExtensionlessAttachments: z.boolean().default(false),
    defaultValue: attachment.array().optional(),
    minEntries: z.number().min(0).optional(),
    maxEntries: z.number().min(0).optional(),
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
  .and(LookupFormElementSchema)
  .and(
    z.union([
      z.object({
        restrictFileTypes: z
          .literal(false)
          .optional()
          .transform(() => false),
      }),
      z.object({
        restrictFileTypes: z.literal(true),
        restrictedFileTypes: z.string().array(),
      }),
    ]),
  )
  .refine(
    refineMaxGreaterThanMin.validation({
      getMin: (v) => v.minEntries,
      getMax: (v) => v.maxEntries,
    }),
    refineMaxGreaterThanMin.error({
      min: 'minEntries',
      max: 'maxEntries',
    }),
  )
  .refine(
    refineRange.validation({
      getField: (v) => v.defaultValue?.length,
      getMin: (v) => v.minEntries,
      getMax: (v) => v.maxEntries,
    }),
    refineRange.error({
      path: 'defaultValue',
      min: 'minEntries',
      max: 'maxEntries',
    }),
  )
