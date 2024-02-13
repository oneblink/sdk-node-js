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
  OptionsFormElementSchema,
  placeholderValue,
  customCssClasses,
  hintPosition,
} from '../property-schemas'

export default z
  .object({
    type: z.literal('autocomplete'),
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
  .and(
    z.union([
      OptionsFormElementSchema,
      z.object({
        optionsType: z.literal('SEARCH'),
        searchUrl: z.string().url(),
        searchQuerystringParameter: z.string().optional(),
      }),
    ]),
  )
