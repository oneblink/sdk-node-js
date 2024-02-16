import { z } from 'zod'
import FormElementSchema from '../element-schema'
import {
  baseSchemas,
  label,
  ConditionallyShowSchema,
  customCssClasses,
} from '../property-schemas'
import { FormTypes } from '@oneblink/types'
import { getRefineUniquePropInArrayArgs } from '../common'

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
        .min(1)
        .refine(...getRefineUniquePropInArrayArgs('id')),
    ),
  })
  .and(ConditionallyShowSchema)

export default PageElementSchema
