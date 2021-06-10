import Joi from 'joi'
import { elementTypes } from './common'
import { FormTypes } from '@oneblink/types'

// User Input
import TextElement from './elements/TextElement'
import NumberElement from './elements/NumberElement'
import EmailElement from './elements/EmailElement'
import PhoneElement from './elements/PhoneElement'
import BarcodeElement from './elements/BarcodeElement'
// User Selection
import RadioElement from './elements/RadioElement'
import CheckboxElement from './elements/CheckboxElement'
import SelectElement from './elements/SelectElement'
import AutocompleteElement from './elements/AutocompleteElement'
import BooleanElement from './elements/BooleanElement'
// Date and Time
import DateElement from './elements/DateElement'
import TimeElement from './elements/TimeElement'
// Informational
import HeadingElement from './elements/HeadingElement'
import HTMLElement from './elements/HTMLElement'
import ImageElement from './elements/ImageElement'
import InfoPageElement from './elements/InfoPageElement'
// Advanced
import CameraElement from './elements/CameraElement'
import RepeatableSetElement from './elements/RepeatableSetElement'
import DrawElement from './elements/DrawElement'
import CalculationElement from './elements/CalculationElement'
import LocationElement from './elements/LocationElement'
import FilesElement from './elements/FilesElement'
import CaptchaElement from './elements/CaptchaElement'
import FormElement from './elements/FormElement'
import SummaryElement from './elements/SummaryElement'
import ComplianceElement from './elements/ComplianceElement'
import FileElement from './elements/FileElement'
import SectionElement from './elements/SectionElement'
//Integration
import GeoscapeElement from './elements/GeoscapeElement'
import PointElement from './elements/PointElement'
import civicaStreetNameElement from './elements/CivicaStreetNameElement'

const typeCase = (type: FormTypes.FormElementType) => {
  return Joi.object({
    type,
  }).unknown()
}

const schema = Joi.object({
  type: Joi.string()
    .required()
    .valid(...elementTypes),
})
  .options({ stripUnknown: true })
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
  .when(typeCase('boolean'), {
    then: BooleanElement,
  })
  .when(typeCase('civicaStreetName'), {
    then: civicaStreetNameElement,
  })
  .when(typeCase('section'), {
    then: SectionElement,
  })

export default schema
