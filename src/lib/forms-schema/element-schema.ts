import { z } from 'zod'
import { FormTypes } from '@oneblink/types'

import AbnElement from './elements/AbnElement'
import ArcGISWebMapElement from './elements/ArcGISWebMapElement'
import AutocompleteElement from './elements/AutocompleteElement'
import BarcodeElement from './elements/BarcodeElement'
import BooleanElement from './elements/BooleanElement'
import BsbElement from './elements/BsbElement'
import CalculationElement from './elements/CalculationElement'
import CameraElement from './elements/CameraElement'
import CaptchaElement from './elements/CaptchaElement'
import CheckboxElement from './elements/CheckboxElement'
import CivicaNameRecordElement from './elements/CivicaNameRecordElement'
import CivicaStreetNameElement from './elements/CivicaStreetNameElement'
import ComplianceElement from './elements/ComplianceElement'
import DateElement from './elements/DateElement'
import DrawElement from './elements/DrawElement'
import EmailElement from './elements/EmailElement'
import FilesElement from './elements/FilesElement'
import FormElement from './elements/FormElement'
import FreshdeskDependentFieldElement from './elements/FreshdeskDependentFieldElement'
import GeoscapeElement from './elements/GeoscapeElement'
import HeadingElement from './elements/HeadingElement'
import HTMLElement from './elements/HTMLElement'
import ImageElement from './elements/ImageElement'
import LiquorLicenceElement from './elements/LiquorLicenceElement'
import LocationElement from './elements/LocationElement'
import NumberElement from './elements/NumberElement'
import PageElement from './elements/PageElement'
import PhoneElement from './elements/PhoneElement'
import PointElement from './elements/PointElement'
import RadioElement from './elements/RadioElement'
import RepeatableSetElement from './elements/RepeatableSetElement'
import SectionElement from './elements/SectionElement'
import SelectElement from './elements/SelectElement'
import SummaryElement from './elements/SummaryElement'
import TextElement from './elements/TextElement'
import TimeElement from './elements/TimeElement'

const FormElementSchema: z.ZodType<
  FormTypes.FormElement,
  z.ZodTypeDef,
  unknown
> = z.union([
  AbnElement,
  ArcGISWebMapElement,
  AutocompleteElement,
  BarcodeElement,
  BooleanElement,
  BsbElement,
  CalculationElement,
  CameraElement,
  CaptchaElement,
  CheckboxElement,
  CivicaNameRecordElement,
  CivicaStreetNameElement,
  ComplianceElement,
  DateElement,
  DrawElement,
  EmailElement,
  FilesElement,
  FormElement,
  FreshdeskDependentFieldElement,
  GeoscapeElement,
  HeadingElement,
  HTMLElement,
  ImageElement,
  LiquorLicenceElement,
  LocationElement,
  NumberElement,
  PageElement,
  PhoneElement,
  PointElement,
  RadioElement,
  RepeatableSetElement,
  SectionElement,
  SelectElement,
  SummaryElement,
  TextElement,
  TimeElement,
])

export default FormElementSchema
