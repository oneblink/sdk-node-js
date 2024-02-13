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
    type: z.literal('checkboxes'),
    ...baseSchemas,
    name,
    label,
    hint,
    hintPosition,
    ...requiredSchemas,
    readOnly,
    defaultValue: z.string().array().optional(),
    buttons,
    canToggleAll,
    customCssClasses,
    requiredAll: z.boolean().optional(),
  })
  .and(ConditionallyShowSchema)
  .and(LookupFormElementSchema)
  .and(OptionsFormElementSchema)
