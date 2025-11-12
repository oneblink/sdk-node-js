import Joi from 'joi'
import { FormTypes } from '@oneblink/types'

// User Input
import TextElement, {
  textElementType,
  textareaElementType,
} from './elements/TextElement'
import NumberElement, {
  type as numberElementType,
} from './elements/NumberElement'
import EmailElement, { type as emailElementType } from './elements/EmailElement'
import PhoneElement, { type as phoneElementType } from './elements/PhoneElement'
import BarcodeElement, {
  type as barcodeElementType,
} from './elements/BarcodeElement'
// User Selection
import RadioElement, { type as radioElementType } from './elements/RadioElement'
import CheckboxElement, {
  type as checkboxElementType,
} from './elements/CheckboxElement'
import SelectElement, {
  type as selectElementType,
} from './elements/SelectElement'
import AutocompleteElement, {
  type as autocompleteElementType,
} from './elements/AutocompleteElement'
import BooleanElement, {
  type as booleanElementType,
} from './elements/BooleanElement'
// Date and Time
import DateElement, {
  dateElementType,
  datetimeElementType,
} from './elements/DateElement'
import TimeElement, { type as timeElementType } from './elements/TimeElement'
// Informational
import HeadingElement, {
  type as headingElementType,
} from './elements/HeadingElement'
import HTMLElement, { type as hTMLElementType } from './elements/HTMLElement'
import ImageElement, { type as imageElementType } from './elements/ImageElement'
import InfoPageElement, {
  type as infoPageElementType,
} from './elements/InfoPageElement'
// Advanced
import CameraElement, {
  type as cameraElementType,
} from './elements/CameraElement'
import RepeatableSetElement, {
  type as repeatableSetElementType,
} from './elements/RepeatableSetElement'
import DrawElement, { type as drawElementType } from './elements/DrawElement'
import CalculationElement, {
  type as calculationElementType,
} from './elements/CalculationElement'
import LocationElement, {
  type as locationElementType,
} from './elements/LocationElement'
import FilesElement, { type as filesElementType } from './elements/FilesElement'
import CaptchaElement, {
  type as captchaElementType,
} from './elements/CaptchaElement'
import FormElement, { type as formElementType } from './elements/FormElement'
import SummaryElement, {
  type as summaryElementType,
} from './elements/SummaryElement'
import ComplianceElement, {
  type as complianceElementType,
} from './elements/ComplianceElement'
// Integration
import GeoscapeElement, {
  type as geoscapeElementType,
} from './elements/GeoscapeElement'
import PointElement, { type as pointElementType } from './elements/PointElement'
import PointV3Element, {
  type as pointV3ElementType,
} from './elements/PointV3Element'
import PointCadastralParcelElement, {
  type as pointCadastralParcelType,
} from './elements/PointCadastralParcelElement'
import GoogleAddressElement, {
  type as googleAddressElementType,
} from './elements/GoogleAddressElement'
import CivicaStreetNameElement, {
  type as civicaStreetNameElementType,
} from './elements/CivicaStreetNameElement'
import CivicaNameRecordElement, {
  type as civicaNameRecordElementType,
} from './elements/CivicaNameRecordElement'
import SectionElement, {
  type as sectionElementType,
} from './elements/SectionElement'
import BsbElement, { type as bsbElementType } from './elements/BsbElement'
import AbnElement, { type as abnElementType } from './elements/AbnElement'
import FreshdeskDependentFieldElement, {
  type as freshdeskDependentFieldType,
} from './elements/FreshdeskDependentFieldElement'
import LiquorLicenceElement, {
  type as liquorLicenceElementType,
} from './elements/LiquorLicenceElement'
import ArcGISWebMapElement, {
  type as ArcGISWebMapElementType,
} from './elements/ArcGISWebMapElement'
import LookupButtonElement, {
  type as lookupButtonElementType,
} from './elements/LookupButtonElement'
// Creating an object here so we get a Typescript error when adding a
// new element type and forgetting to add to the array of allowed types
const elementTypesMap: Record<
  Exclude<FormTypes.FormElementType, 'page'>,
  null
> = {
  [textElementType]: null,
  [textareaElementType]: null,
  [numberElementType]: null,
  [emailElementType]: null,
  [phoneElementType]: null,
  [barcodeElementType]: null,
  [radioElementType]: null,
  [checkboxElementType]: null,
  [selectElementType]: null,
  [autocompleteElementType]: null,
  [booleanElementType]: null,
  [dateElementType]: null,
  [datetimeElementType]: null,
  [timeElementType]: null,
  [headingElementType]: null,
  [hTMLElementType]: null,
  [imageElementType]: null,
  [infoPageElementType]: null,
  [cameraElementType]: null,
  [repeatableSetElementType]: null,
  [drawElementType]: null,
  [calculationElementType]: null,
  [locationElementType]: null,
  [filesElementType]: null,
  [captchaElementType]: null,
  [formElementType]: null,
  [summaryElementType]: null,
  [complianceElementType]: null,
  [geoscapeElementType]: null,
  [pointElementType]: null,
  [pointV3ElementType]: null,
  [googleAddressElementType]: null,
  [civicaStreetNameElementType]: null,
  [civicaNameRecordElementType]: null,
  [sectionElementType]: null,
  [bsbElementType]: null,
  [abnElementType]: null,
  [freshdeskDependentFieldType]: null,
  [liquorLicenceElementType]: null,
  [ArcGISWebMapElementType]: null,
  [pointCadastralParcelType]: null,
  [lookupButtonElementType]: null,
}

const typeCase = (type: FormTypes.FormElementType) => {
  return Joi.object({
    type,
  }).unknown()
}

const schema = Joi.object({
  type: Joi.string()
    .required()
    .valid(...Object.keys(elementTypesMap).sort()),
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
  .when(typeCase('pointAddressV3'), {
    then: PointV3Element,
  })
  .when(typeCase('pointCadastralParcel'), {
    then: PointCadastralParcelElement,
  })
  .when(typeCase('googleAddress'), {
    then: GoogleAddressElement,
  })
  .when(typeCase('boolean'), {
    then: BooleanElement,
  })
  .when(typeCase('civicaStreetName'), {
    then: CivicaStreetNameElement,
  })
  .when(typeCase('section'), {
    then: SectionElement,
  })
  .when(typeCase('civicaNameRecord'), {
    then: CivicaNameRecordElement,
  })
  .when(typeCase('bsb'), {
    then: BsbElement,
  })
  .when(typeCase('abn'), {
    then: AbnElement,
  })
  .when(typeCase(freshdeskDependentFieldType), {
    then: FreshdeskDependentFieldElement,
  })
  .when(typeCase(liquorLicenceElementType), {
    then: LiquorLicenceElement,
  })
  .when(typeCase(ArcGISWebMapElementType), {
    then: ArcGISWebMapElement,
  })
  .when(typeCase(lookupButtonElementType), {
    then: LookupButtonElement,
  })

export default schema
