import { z } from 'zod'
import {
  baseSchemas,
  name,
  label,
  hint,
  readOnly,
  ConditionallyShowSchema,
  customCssClasses,
  hintPosition,
} from '../property-schemas'
import elementSchema from '../element-schema'

export default z
  .object({
    type: z.literal('repeatableSet'),
    ...baseSchemas,
    name,
    label,
    hint,
    hintPosition,
    readOnly,
    minSetEntries: z
      .union([
        z.number().min(0),
        z.object({
          type: z.literal('FORM_ELEMENT'),
          elementId: z.string().uuid(),
        }),
      ])
      .optional(),
    maxSetEntries: z
      .union([
        z.number().min(0),
        z.object({
          type: z.literal('FORM_ELEMENT'),
          elementId: z.string().uuid(),
        }),
      ])
      .optional(),
    addSetEntryLabel: z.string().optional(),
    removeSetEntryLabel: z.string().optional(),
    elements: z.lazy(() =>
      elementSchema
        .array()
        // TODO .unique('id')
        .min(1),
    ),
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
  .refine(
    (value) => {
      return (
        typeof value.minSetEntries !== 'number' ||
        typeof value.maxSetEntries !== 'number' ||
        value.minSetEntries <= value.maxSetEntries
      )
    },
    {
      message: 'must be greater than or equal to "minSetEntries"',
      path: ['maxSetEntries'],
    },
  )
