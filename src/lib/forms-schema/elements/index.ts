import Joi from 'joi'
import { elementTypes } from '../common'
import { FormTypes } from '@oneblink/types'

import TextElement from './TextElement'
import NumberElement from './NumberElement'
import EmailElement from './EmailElement'
import PhoneElement from './PhoneElement'
import BarcodeElement from './BarcodeElement'
import RadioElement from './RadioElement'
import CheckboxElement from './CheckboxElement'
import SelectElement from './SelectElement'
import AutocompleteElement from './AutocompleteElement'

const typeCase = (type: FormTypes.FormElementType) => {
  return Joi.object({
    type,
  }).unknown()
}
export default Joi.object({
  type: Joi.string().required().valid(elementTypes),
})
  .when(typeCase('text'), {
    then: TextElement,
  })
  .when(typeCase('textarea'), {
    then: TextElement,
  })
  .when(typeCase('number'), {
    then: NumberElement,
  })
  .when(typeCase('email'), {
    then: EmailElement,
  })
  .when(typeCase('telephone'), {
    then: PhoneElement,
  })
  .when(typeCase('barcodeScanner'), {
    then: BarcodeElement,
  })
  .when(typeCase('radio'), {
    then: RadioElement,
  })
  .when(typeCase('checkboxes'), {
    then: CheckboxElement,
  })
  .when(typeCase('select'), {
    then: SelectElement,
  })
  .when(typeCase('autocomplete'), {
    then: AutocompleteElement,
  })
