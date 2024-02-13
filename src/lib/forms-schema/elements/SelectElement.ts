import { z } from 'zod'
import {
  baseSchemas,
  name,
  label,
  hint,
  requiredSchemas,
  readOnly,
  ConditionallyShowSchema,
  LookupFormElementSchema,
  buttons,
  OptionsFormElementSchema,
  canToggleAll,
  customCssClasses,
  hintPosition,
} from '../property-schemas'

export default z
  .object({
    type: z.literal('select'),
    ...baseSchemas,
    name,
    label,
    hint,
    hintPosition,
    ...requiredSchemas,
    readOnly,
    buttons,
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
  .and(LookupFormElementSchema)
  .and(OptionsFormElementSchema)
  .and(
    z.union([
      z.object({
        multi: z
          .literal(false)
          .optional()
          .transform(() => false),
        defaultValue: z.string().optional(),
      }),
      z.object({
        multi: z.literal(true),
        defaultValue: z.string().array().optional(),
        canToggleAll,
      }),
    ]),
  )
