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
  customCssClasses,
  hintPosition,
} from '../property-schemas'

export default z
  .object({
    type: z.literal('pointAddress'),
    ...baseSchemas,
    name,
    label,
    hint,
    hintPosition,
    ...requiredSchemas,
    readOnly,
    placeholderValue,
    stateTerritoryFilter: z.string().array().optional(),
    addressTypeFilter: z.string().array().optional(),
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
  .and(LookupFormElementSchema)
