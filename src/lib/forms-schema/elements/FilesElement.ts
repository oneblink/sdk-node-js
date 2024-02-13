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
    (value) => {
      return (
        value.minEntries === undefined ||
        value.maxEntries === undefined ||
        value.minEntries <= value.maxEntries
      )
    },
    {
      message: 'must be greater than or equal to "minEntries"',
      path: ['maxEntries'],
    },
  )
  .refine(
    (value) => {
      return (
        !value.defaultValue ||
        value.minEntries === undefined ||
        value.defaultValue.length >= value.minEntries
      )
    },
    {
      message: 'must be greater than or equal to "minEntries"',
      path: ['defaultValue'],
    },
  )
  .refine(
    (value) => {
      return (
        !value.defaultValue ||
        value.maxEntries === undefined ||
        value.defaultValue.length <= value.maxEntries
      )
    },
    {
      message: 'must be less than or equal to "maxEntries"',
      path: ['defaultValue'],
    },
  )
