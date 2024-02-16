import { z } from 'zod'
import {
  baseSchemas,
  name,
  label,
  requiredSchemas,
  readOnly,
  ConditionallyShowSchema,
  customCssClasses,
} from '../property-schemas'
import { htmlString } from '../common'

export default z
  .object({
    type: z.literal('calculation'),
    ...baseSchemas,
    name,
    label,
    ...requiredSchemas,
    readOnly,
    defaultValue: htmlString,
    calculation: z.string(),
    preCalculationDisplay: htmlString
      .nullish()
      .transform((value) => value ?? undefined),
    displayAsCurrency: z
      .boolean()
      .nullish()
      .transform((value) => value ?? undefined),
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
