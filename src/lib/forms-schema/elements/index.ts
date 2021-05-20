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
    }),
    {
      then: TextElement,
    },
  )
  .when(
    Joi.object({
      type: 'textarea',
    }),
    {
      then: TextElement,
    },
  )
  .when(
    Joi.object({
      type: 'number',
    }),
    {
      then: NumberElement,
    },
  )
  .when(
    Joi.object({
      type: 'text',
    }),
    {
      then: TextElement,
    },
  )
  .when(
    Joi.object({
      type: 'email',
    }),
    {
      then: EmailElement,
    },
  )
  .when(
    Joi.object({
      type: 'telephone',
    }),
    {
      then: PhoneElement,
    },
  )
  .when(
    Joi.object({
      type: 'barcodeScanner',
    }),
    {
      then: BarcodeElement,
    },
  )
