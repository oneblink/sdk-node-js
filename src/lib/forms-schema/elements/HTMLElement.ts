import { z } from 'zod'
import {
  baseSchemas,
  name,
  label,
  ConditionallyShowSchema,
  customCssClasses,
} from '../property-schemas'
import { htmlString } from '../common'

export const type = 'html'

export default z
  .object({
    type: z.literal('html'),
    ...baseSchemas,
    name,
    label,
    defaultValue: htmlString,
    customCssClasses,
  })

  .and(ConditionallyShowSchema)
