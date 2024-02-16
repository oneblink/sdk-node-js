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
import {
  refineMaxGreaterThanMin,
  getRefineUniquePropInArrayArgs,
} from '../common'

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
        .min(1)
        .refine(...getRefineUniquePropInArrayArgs('id')),
    ),
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
  .refine(
    refineMaxGreaterThanMin.validation({
      getMin: (v) =>
        typeof v.minSetEntries === 'number' ? v.minSetEntries : undefined,
      getMax: (v) =>
        typeof v.maxSetEntries === 'number' ? v.maxSetEntries : undefined,
    }),
    refineMaxGreaterThanMin.error({
      min: 'minSetEntries',
      max: 'maxSetEntries',
    }),
  )
