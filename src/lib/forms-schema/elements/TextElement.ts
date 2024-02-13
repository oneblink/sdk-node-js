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
    (value) => {
      return (
        value.minLength === undefined ||
        value.maxLength === undefined ||
        value.minLength <= value.maxLength
      )
    },
    {
      message: 'must be greater than or equal to "minLength"',
      path: ['maxLength'],
    },
  )
  .refine(
    (value) => {
      return (
        !value.defaultValue ||
        value.minLength === undefined ||
        value.defaultValue.length >= value.minLength
      )
    },
    {
      message: 'must be greater than or equal to "minLength"',
      path: ['defaultValue'],
    },
  )
  .refine(
    (value) => {
      return (
        !value.defaultValue ||
        value.maxLength === undefined ||
        value.defaultValue.length <= value.maxLength
      )
    },
    {
      message: 'must be less than or equal to "maxLength"',
      path: ['defaultValue'],
    },
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
