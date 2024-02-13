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
  RegexFormElementSchema,
  customCssClasses,
  hintPosition,
} from '../property-schemas'

export default z
  .object({
    type: z.literal('number'),
    ...baseSchemas,
    name,
    label,
    hint,
    hintPosition,
    ...requiredSchemas,
    readOnly,
    placeholderValue,
    isSlider: z.boolean().default(false),
    sliderIncrement: z.number().optional(),
    minNumber: z
      .number()
      .optional()
      .nullable()
      .transform((value) => value ?? undefined),
    maxNumber: z
      .number()
      .optional()
      .nullable()
      .transform((value) => value ?? undefined),
    isInteger: z.boolean().optional(),
    defaultValue: z.number().optional(),
    customCssClasses,
  })
  .and(ConditionallyShowSchema)
  .and(LookupFormElementSchema)
  .and(RegexFormElementSchema)
  .and(
    z.union([
      z.object({
        isSlider: z
          .literal(false)
          .optional()
          .transform(() => false),
        sliderIncrement: z.string().optional(),
      }),
      z.object({
        isSlider: z.literal(true),
        sliderIncrement: z.string().array().optional(),
      }),
    ]),
  )
  .transform((value) => {
    if (!value.isSlider) {
      value.sliderIncrement = undefined
    }
    return value
  })
  .refine(
    (value) => {
      return !value.isSlider || typeof value.minNumber === 'number'
    },
    {
      message: 'is required if "isSlider" is true',
      path: ['minNumber'],
    },
  )
  .refine(
    (value) => {
      return (
        !value.isInteger ||
        value.minNumber === undefined ||
        Number.isInteger(value.minNumber)
      )
    },
    {
      message: 'must be an integer if "isInteger" is true',
      path: ['minNumber'],
    },
  )
  .refine(
    (value) => {
      return !value.isSlider || typeof value.maxNumber === 'number'
    },
    {
      message: 'is required if "isSlider" is true',
      path: ['maxNumber'],
    },
  )
  .refine(
    (value) => {
      return (
        !value.isInteger ||
        value.maxNumber === undefined ||
        Number.isInteger(value.maxNumber)
      )
    },
    {
      message: 'must be an integer if "isInteger" is true',
      path: ['maxNumber'],
    },
  )
  .refine(
    (value) => {
      return (
        value.minNumber === undefined ||
        value.maxNumber === undefined ||
        value.minNumber <= value.maxNumber
      )
    },
    {
      message: 'must be greater than or equal to "minNumber"',
      path: ['maxNumber'],
    },
  )
  .refine(
    (value) => {
      return (
        value.defaultValue === undefined ||
        value.minNumber === undefined ||
        value.defaultValue >= value.minNumber
      )
    },
    {
      message: 'must be greater than or equal to "minNumber"',
      path: ['defaultValue'],
    },
  )
  .refine(
    (value) => {
      return (
        value.defaultValue === undefined ||
        value.maxNumber === undefined ||
        value.defaultValue <= value.maxNumber
      )
    },
    {
      message: 'must be less than or equal to "maxNumber"',
      path: ['defaultValue'],
    },
  )
  .refine(
    (value) => {
      return (
        !value.isInteger ||
        value.defaultValue === undefined ||
        Number.isInteger(value.defaultValue)
      )
    },
    {
      message: 'must be an integer if "isInteger" is true',
      path: ['defaultValue'],
    },
  )
  .refine(
    (value) => {
      return (
        !value.isSlider ||
        value.defaultValue === undefined ||
        Number.isInteger(value.defaultValue)
      )
    },
    {
      message: 'must be an integer',
      path: ['sliderIncrement'],
    },
  )
  .refine(
    (value) => {
      return (
        value.sliderIncrement === undefined ||
        value.minNumber === undefined ||
        value.sliderIncrement >= value.minNumber
      )
    },
    {
      message: 'must be greater than or equal to "minNumber"',
      path: ['sliderIncrement'],
    },
  )
