import Joi from 'joi'
import { elementTypes } from '../common'
import TextElement from './TextElement'
import NumberElement from './NumberElement'
import EmailElement from './EmailElement'
import PhoneElement from './PhoneElement'
import BarcodeElement from './BarcodeElement'

export default Joi.object({
  type: Joi.string().required().valid(elementTypes),
})
  .when(
    Joi.object({
      type: 'text',
    }).unknown(),
    {
      then: TextElement,
    },
  )
  .when(
    Joi.object({
      type: 'textarea',
    }).unknown(),
    {
      then: TextElement,
    },
  )
  .when(
    Joi.object({
      type: 'number',
    }).unknown(),
    {
      then: NumberElement,
    },
  )
  .when(
    Joi.object({
      type: 'text',
    }).unknown(),
    {
      then: TextElement,
    },
  )
  .when(
    Joi.object({
      type: 'email',
    }).unknown(),
    {
      then: EmailElement,
    },
  )
  .when(
    Joi.object({
      type: 'telephone',
    }).unknown(),
    {
      then: PhoneElement,
    },
  )
  .when(
    Joi.object({
      type: 'barcodeScanner',
    }).unknown(),
    {
      then: BarcodeElement,
    },
  )
