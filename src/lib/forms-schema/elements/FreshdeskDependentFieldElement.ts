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
  customCssClasses,
  hintPosition,
} from '../property-schemas'

export default z
  .object({
    type: z.literal('freshdeskDependentField'),
    ...baseSchemas,
    name,
    label,
    hint,
    hintPosition,
    subCategoryLabel: label,
    subCategoryHint: hint,
    itemLabel: label,
    itemHint: hint,
    ...requiredSchemas,
    readOnly,
    defaultValue: z
      .object({
        category: z.string().optional(),
        subCategory: z.string().optional(),
        item: z.string().optional(),
      })
      .optional(),
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
  .and(LookupFormElementSchema)
  .and(OptionsFormElementSchema)
