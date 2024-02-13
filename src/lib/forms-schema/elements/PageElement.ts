import { z } from 'zod'
import FormElementSchema from '../element-schema'
import {
  baseSchemas,
  label,
  ConditionallyShowSchema,
  customCssClasses,
} from '../property-schemas'
import { FormTypes } from '@oneblink/types'

const PageElementSchema: z.ZodType<
  FormTypes.PageElement,
  z.ZodTypeDef,
  unknown
> = z
  .object({
    type: z.literal('page'),
    ...baseSchemas,
    label,
    customCssClasses,
    elements: z.lazy(() =>
      FormElementSchema.array()
        // TODO .unique('id')
        .min(1),
    ),
  })
  .and(ConditionallyShowSchema)

export default PageElementSchema
