import Joi from 'joi'
import { elementTypes } from '../common'
import { FormTypes } from '@oneblink/types'

// User Input
import TextElement from './TextElement'
import NumberElement from './NumberElement'
import EmailElement from './EmailElement'
import PhoneElement from './PhoneElement'
import BarcodeElement from './BarcodeElement'
// User Selection
import RadioElement from './RadioElement'
import CheckboxElement from './CheckboxElement'
import SelectElement from './SelectElement'
import AutocompleteElement from './AutocompleteElement'
// Date and Time
import DateElement from './DateElement'
import TimeElement from './TimeElement'
// Informational
import HeadingElement from './HeadingElement'
import HTMLElement from './HTMLElement'
import ImageElement from './ImageElement'
import InfoPageElement from './InfoPageElement'
// Advanced
import CameraElement from './CameraElement'
import RepeatableSetElement from './RepeatableSetElement'
import DrawElement from './DrawElement'
import CalculationElement from './CalculationElement'
import LocationElement from './LocationElement'
import FilesElement from './FilesElement'
import CaptchaElement from './CaptchaElement'
import FormElement from './FormElement'
import SummaryElement from './SummaryElement'
import ComplianceElement from './ComplianceElement'
import FileElement from './FileElement'
//Integration
import GeoscapeElement from './GeoscapeElement'
import PointElement from './PointElement'

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
  .when(typeCase('date'), {
    then: DateElement,
  })
  .when(typeCase('datetime'), {
    then: DateElement,
  })
  .when(typeCase('time'), {
    then: TimeElement,
  })
  .when(typeCase('heading'), {
    then: HeadingElement,
  })
  .when(typeCase('html'), {
    then: HTMLElement,
  })
  .when(typeCase('image'), {
    then: ImageElement,
  })
  .when(typeCase('infoPage'), {
    then: InfoPageElement,
  })
  .when(typeCase('camera'), {
    then: CameraElement,
  })
  .when(typeCase('repeatableSet'), {
    then: RepeatableSetElement,
  })
  .when(typeCase('draw'), {
    then: DrawElement,
  })
  .when(typeCase('calculation'), {
    then: CalculationElement,
  })
  .when(typeCase('location'), {
    then: LocationElement,
  })
  .when(typeCase('files'), {
    then: FilesElement,
  })
  .when(typeCase('file'), {
    then: FileElement,
  })
  .when(typeCase('captcha'), {
    then: CaptchaElement,
  })
  .when(typeCase('form'), {
    then: FormElement,
  })
  .when(typeCase('summary'), {
    then: SummaryElement,
  })
  .when(typeCase('compliance'), {
    then: ComplianceElement,
  })
  .when(typeCase('geoscapeAddress'), {
    then: GeoscapeElement,
  })
  .when(typeCase('pointAddress'), {
    then: PointElement,
  })
