import { z } from 'zod'
import {
  baseSchemas,
  name,
  label,
  hint,
  requiredSchemas,
  readOnly,
  placeholderValue,
  customCssClasses,
  hintPosition,
  ConditionallyShowSchema,
  LookupFormElementSchema,
  RegexFormElementSchema,
} from '../property-schemas'
import { FormTypes } from '@oneblink/types'
import { refineRange, refineMaxGreaterThanMin } from '../common'

const TextElementSchema: z.ZodType<
  FormTypes.TextElement | FormTypes.TextareaElement,
  z.ZodTypeDef,
  unknown
> = z
  .object({
    ...baseSchemas,
    name,
    label,
    hint,
    hintPosition,
    ...requiredSchemas,
    readOnly,
    placeholderValue,
    minLength: z.number().min(0).optional(),
    maxLength: z.number().min(0).optional(),
    defaultValue: z.string().optional(),
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
  .and(LookupFormElementSchema)
  .and(RegexFormElementSchema)
  .refine(
    refineMaxGreaterThanMin.validation({
      getMin: (v) => v.minLength,
      getMax: (v) => v.maxLength,
    }),
    refineMaxGreaterThanMin.error({
      min: 'minLength',
      max: 'maxLength',
    }),
  )
  .refine(
    refineRange.validation({
      getField: (v) => v.defaultValue?.length,
      getMin: (v) => v.minLength,
      getMax: (v) => v.maxLength,
    }),
    refineRange.error({
      path: 'defaultValue',
      min: 'minLength',
      max: 'maxLength',
    }),
  )
  .and(
    z.union([
      z.object({
        type: z.literal('text'),
      }),
      z.object({
        type: z.literal('textarea'),
      }),
    ]),
  )

export default TextElementSchema
