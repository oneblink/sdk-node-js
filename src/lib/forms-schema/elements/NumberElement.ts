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
import { refineRange, refineMaxGreaterThanMin } from '../common'

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
    minNumber: z
      .number()
      .nullish()
      .transform((value) => value ?? undefined),
    maxNumber: z
      .number()
      .nullish()
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
        isSlider: z.literal(false).default(false),
      }),
      z.object({
        isSlider: z.literal(true),
        sliderIncrement: z.number().optional(),
      }),
    ]),
  )
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
    refineMaxGreaterThanMin.validation({
      getMin: (v) => v.minNumber,
      getMax: (v) => v.maxNumber,
    }),
    refineMaxGreaterThanMin.error({
      min: 'minNumber',
      max: 'maxNumber',
    }),
  )
  .refine(
    refineRange.validation({
      getMin: (v) => v.minNumber,
      getMax: (v) => v.maxNumber,
      getField: (v) => v.defaultValue,
    }),
    refineRange.error({
      path: 'defaultValue',
      min: 'minNumber',
      max: 'maxNumber',
    }),
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
    refineRange.validation({
      getMin: (v) => v.minNumber,
      getMax: (v) => v.maxNumber,
      getField: (v) => (v.isSlider ? v.sliderIncrement : undefined),
    }),
    refineRange.error({
      path: 'sliderIncrement',
      min: 'minNumber',
      max: 'maxNumber',
    }),
  )
