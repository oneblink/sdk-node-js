// @flow

declare type FormId = number | 'create'

////////////////////////////////////////
// Element Types

declare type FormElementTypeGroup =
  | 'STATIC'
  | 'INPUT'
  | 'DATE'
  | 'OPTIONS'
  | 'ADVANCED'

declare type FormElementType =
  | 'text'
  | 'email'
  | 'textarea'
  | 'number'
  | 'select'
  | 'checkboxes'
  | 'radio'
  | 'draw'
  | 'camera'
  | 'date'
  | 'time'
  | 'datetime'
  | 'heading'
  | 'location'
  | 'repeatableSet'
  | 'page'
  | 'html'
  | 'barcodeScanner'
  | 'captcha'
  | 'image'
  | 'file'
  | 'files'
  | 'calculation'
  | 'telephone'
  | 'autocomplete'
  | 'form'
  | 'infoPage'
  | 'summary'

declare type ElementType = {
  id: FormElementType,
  display: string,
  isInfoPageType: boolean,
  group: FormElementTypeGroup,
}

declare type ElementTypeGroup = {
  id: FormElementTypeGroup,
  isInfoPageType: boolean,
  display: string,
  elementTypes: ElementType[],
}

declare type LookupFormElement = {
  isDataLookup: boolean,
  dataLookupId?: number,
  isElementLookup: boolean,
  elementLookupId?: number,
} & FormElementBase

declare type ConditionallyShowPredicateBase = {
  elementId: string,
}

declare type ConditionallyShowPredicateNumeric = ConditionallyShowPredicateBase & {
  type: 'NUMERIC',
  operator: '===' | '!==' | '>' | '>=' | '<' | '<=',
  value: number,
}

declare type ConditionallyShowPredicateOptions = ConditionallyShowPredicateBase & {
  type: 'OPTIONS',
  optionIds: Array<string>,
}

declare type ConditionallyShowPredicate =
  | ConditionallyShowPredicateNumeric
  | ConditionallyShowPredicateOptions

declare type _FormElementBase = {
  isNew?: boolean,
  id: string,
  conditionallyShow: boolean,
  requiresAllConditionallyShowPredicates: boolean,
  conditionallyShowPredicates?: ConditionallyShowPredicate[],
}

declare type FormElementBase = _FormElementBase & {
  name: string,
  label: string,
}

declare type FormElementRequired = FormElementBase & {
  required: boolean,
}

// Choice element types
declare type DynamicChoiceElementOption = {
  label: string,
  value: string,
  colour?: string,
}

declare type ChoiceElementOptionAttribute = {
  label?: string,
  value?: string,
  elementId: string,
  optionIds: string[],
}

declare type ChoiceElementOption = {
  id: string,
  attributes?: ChoiceElementOptionAttribute[],
} & DynamicChoiceElementOption

declare type DynamicOptionsSetAttributeMap = {
  elementId: string,
  attribute: string,
}

declare type FormElementWithOptionsBase = FormElementRequired & {
  options: ChoiceElementOption[],
  optionsType: 'CUSTOM' | 'DYNAMIC' | 'SEARCH',
  dynamicOptionSetId: ?number,
  conditionallyShowOptions?: boolean,
  conditionallyShowOptionsElementIds?: string[],
  attributesMapping?: DynamicOptionsSetAttributeMap[],
}

declare type FormFormElement = _FormElementBase & {
  type: 'form',
  name: string,
  formId: number,
}

declare type InfoPageElement = _FormElementBase & {
  type: 'infoPage',
  name: string,
  formId: number,
}

declare type RadioButtonElement = FormElementWithOptionsBase & {
  type: 'radio',
  buttons: boolean,
  readOnly: boolean,
  defaultValue: ?string,
} & LookupFormElement

declare type CheckboxElement = FormElementWithOptionsBase & {
  type: 'checkboxes',
  buttons: boolean,
  readOnly: boolean,
  defaultValue: ?(string[]),
} & LookupFormElement

declare type SelectElement = FormElementWithOptionsBase & {
  type: 'select',
  multi: boolean,
  readOnly: boolean,
  defaultValue: ?(string | string[]),
} & LookupFormElement

declare type AutoCompleteElement = FormElementWithOptionsBase & {
  type: 'autocomplete',
  readOnly: boolean,
  defaultValue: ?string,
  searchUrl?: string,
} & LookupFormElement

declare type FormElementWithOptions =
  | RadioButtonElement
  | CheckboxElement
  | SelectElement
  | AutoCompleteElement

// date element types
type DateElementBase = FormElementRequired & {
  readOnly: boolean,
  fromDate?: ?Date,
  toDate?: ?Date,
  defaultValue: ?Date,
} & LookupFormElement

declare type DateElement = DateElementBase & {
  type: 'date',
} & LookupFormElement

declare type DateTimeElement = DateElementBase & {
  type: 'datetime',
} & LookupFormElement

declare type TimeElement = FormElementRequired & {
  type: 'time',
  readOnly: boolean,
  defaultValue: ?Date,
} & LookupFormElement

declare type NumberElement = FormElementRequired & {
  type: 'number',
  readOnly: boolean,
  minNumber?: ?number,
  maxNumber?: ?number,
  defaultValue: ?number,
  isSlider: boolean,
  sliderIncrement?: ?number,
} & LookupFormElement

declare type TextElement = FormElementRequired & {
  type: 'text',
  readOnly: boolean,
  defaultValue: ?string,
} & LookupFormElement

declare type TextareaElement = FormElementRequired & {
  type: 'textarea',
  readOnly: boolean,
  defaultValue: ?string,
} & LookupFormElement

declare type EmailElement = FormElementRequired & {
  type: 'email',
  readOnly: boolean,
  defaultValue: ?string,
} & LookupFormElement

declare type ImageElement = FormElementBase & {
  type: 'image',
  defaultValue: string,
}

declare type DrawElement = FormElementRequired & {
  type: 'draw',
  readOnly: boolean,
}

declare type CameraElement = FormElementRequired & {
  type: 'camera',
  readOnly: boolean,
}

declare type HeadingElement = FormElementBase & {
  type: 'heading',
  headingType: number,
}

declare type LocationElement = FormElementRequired & {
  type: 'location',
  readOnly: boolean,
} & LookupFormElement

declare type _NestedElementsElement = {
  elements: FormElement[],
}

declare type RepeatableSetElement = FormElementBase & {
  type: 'repeatableSet',
  readOnly: boolean,
  minSetEntries: ?number,
  maxSetEntries: ?number,
  addSetEntryLabel?: string,
  removeSetEntryLabel?: string,
} & _NestedElementsElement

declare type PageElement = _FormElementBase & {
  type: 'page',
  label: string,
} & _NestedElementsElement

declare type NestedElementsElement = PageElement | RepeatableSetElement

declare type HtmlElement = FormElementBase & {
  type: 'html',
  defaultValue: string,
}

declare type BarcodeScannerElement = FormElementRequired & {
  type: 'barcodeScanner',
  readOnly: boolean,
  defaultValue: ?string,
  restrictBarcodeTypes: boolean,
  restrictedBarcodeTypes?: string[],
} & LookupFormElement

declare type CaptchaElement = FormElementRequired & {
  type: 'captcha',
}

declare type FilesElement = FormElementBase & {
  type: 'files',
  readOnly: boolean,
  minEntries: number | void,
  maxEntries: number | void,
  restrictFileTypes: boolean,
  restrictedFileTypes?: string[],
}

declare type FileElement = FormElementRequired & {
  type: 'file',
  readOnly: boolean,
  restrictFileTypes: boolean,
  restrictedFileTypes?: string[],
}

declare type CalculationElement = FormElementBase & {
  type: 'calculation',
  defaultValue: string,
  calculation: ?string,
  preCalculationDisplay: ?string,
}

declare type TelephoneElement = FormElementRequired & {
  type: 'telephone',
  readOnly: boolean,
  defaultValue: ?string,
} & LookupFormElement

declare type SummaryElement = FormElementBase & {
  type: 'summary',
  elementId: string,
}

declare type FormElementWithoutForm =
  | TextElement
  | EmailElement
  | TextareaElement
  | NumberElement
  | SelectElement
  | RadioButtonElement
  | CheckboxElement
  | DrawElement
  | CameraElement
  | DateElement
  | TimeElement
  | DateTimeElement
  | HeadingElement
  | LocationElement
  | RepeatableSetElement
  | PageElement
  | HtmlElement
  | BarcodeScannerElement
  | CaptchaElement
  | ImageElement
  | FileElement
  | FilesElement
  | CalculationElement
  | TelephoneElement
  | AutoCompleteElement
  | SummaryElement

declare type FormElementWithForm = FormFormElement | InfoPageElement

declare type FormElement = FormElementWithoutForm | FormElementWithForm

declare type CalculationInsertionElement =
  | NumberElement
  | CalculationElement
  | SelectElement
  | RadioButtonElement
  | AutoCompleteElement

declare type ConditionalPredicateElement =
  | NumberElement
  | CalculationElement
  | SelectElement
  | RadioButtonElement
  | CheckboxElement
  | AutoCompleteElement

///////////////////////////////////////////////////////////////

declare type TrimUriOption = {
  label: string,
  uri: number,
}
declare type FormSubmissionEventConfiguration = {
  url?: string,
  recordTitle?: string | void,
  container?: TrimUriOption,
  username?: string,
  password?: string,
  recordType?: TrimUriOption,
  actionDefinition?: TrimUriOption,
  location?: TrimUriOption,
  secret?: string,
  email?: string,
  emailSubjectLine?: string,
  pdfFileName?: string,
  apiId?: string,
  apiEnvironment?: string,
  apiEnvironmentRoute?: string,
}

declare type FormSubmissionEventType =
  | 'PDF'
  | 'CALLBACK'
  | 'SPOTTO'
  | 'ONEBLINK_API'
  | 'TRIM'
  | 'CP_PAY'

declare type FormSubmissionEvent = {
  id?: number,
  type: FormSubmissionEventType,
  configuration: FormSubmissionEventConfiguration,
  isDraft: boolean,
}

declare type FormPostSubmissionAction = 'URL' | 'CLOSE' | 'FORMS_LIBRARY'

declare type Form = {
  id: FormId,
  name: string,
  description: string,
  organisationId: string,
  formsAppEnvironmentId: number,
  formsAppIds: number[],
  elements: Array<FormElement>,
  isAuthenticated: boolean,
  isMultiPage: boolean,
  isPublished: boolean,
  isInfoPage: boolean,
  postSubmissionAction: FormPostSubmissionAction,
  redirectUrl?: ?string,
  submissionEvents: FormSubmissionEvent[],
}

declare type ApiForm = Form

declare type FormElementOptionsValidation = {
  allOptions?: string | void,
  [optionId: string]: {
    label: string | void,
    value: string | void,
    colour: string | void,
    attributes: string | void,
  },
}

declare type FormElementValidation = {
  [propertyName: string]: string | void,
  conditionallyShowPredicates?: {
    [index: string]: {
      elementId: string | void,
      optionIds: string | void,
      operator: string | void,
      value: string | void,
    },
  },
  options?: FormElementOptionsValidation,
  attributesMapping?: {
    [label: string]: string | void,
  },
}

declare type FormElementsValidation = {
  [elementId: string]: FormElementValidation,
}

declare type FormState = {
  forms: ?(Form[]),
  isFetching: boolean,
  selectedId: FormId | null,
  isSaving: boolean,
  isSaveable: boolean,
  isUploading: boolean,
  error?: string,
  fetchError: ?Error,
  isShowingPreview: boolean,
  isShowingUnsavedChangesPrompt: boolean,
  formToDelete?: Form,
  isDeleting: boolean,
  isShowingElementInUsePrompt: boolean,
  selectedElementId: ?string,
  selectedPageElementId: ?string,
  elementsValidation: FormElementsValidation,
  conditionallyShownOptionsToClearAttributes?: Array<{
    element: FormElementWithOptions,
    options: ChoiceElementOption[],
  }>,
  conditionalLogicPredicatesToDelete?: ConditionalLogicPredicatesToDelete,
  optionIdToDelete?: string,
  isExporting: boolean,
  isImporting: boolean,
  formToConvert: ?Form,
  formToFetchJSONSchema: ?Form,
  isFetchingJSONSchema: boolean,
  fetchJSONSchemaError: ?Error,
  formJSONSchema: ?Object,
  confirmationType?: string,
}

declare type ConditionalLogicPredicatesToDelete = Array<{
  elementId: string,
  elementLabel: string,
  predicateIndex: number,
  optionId?: string,
}>

declare type FormElementDynamicOptionSetEnvironment = {
  url: string,
  formsAppEnvironmentId: number,
}

declare type FormElementDynamicOptionSet = {
  id?: number,
  apiId?: string,
  name: string,
  organisationId: string,
  environments: FormElementDynamicOptionSetEnvironment[],
  createdAt?: string,
  updatedAt?: string,
}

declare type FormElementLookup = FormElementDynamicOptionSet & {
  type: 'ELEMENT' | 'DATA',
}

declare type DynamicOptionSetData = {
  options: DynamicChoiceElementOption[],
  isFetching: boolean,
  fetchError: boolean,
}

declare type DynamicOptionSetDataById = {
  [formsAppEnvironmentId: number]: {
    [dynamicOptionSetId: number]: DynamicOptionSetData,
  },
}

declare type FormElementDynamicOptionSetsState = {
  formElementDynamicOptionSets: ?(FormElementDynamicOptionSet[]),
  isFetching: boolean,
  fetchError: ?string,
  formElementDynamicOptionsSetToEdit: ?FormElementDynamicOptionSet,
  isSaving: boolean,
  saveError: ?Error,
  formElementDynamicOptionsSetToDelete: ?FormElementDynamicOptionSet,
  isDeleting: boolean,
  deleteError: ?Error,
  dynamicOptionSetData: DynamicOptionSetDataById,
}

declare type FormElementLookupsState = {
  formElementLookups: FormElementLookup[],
  isFetching: boolean,
  fetchError: ?Error,
  formElementLookupToEdit: ?FormElementLookup,
  isSaving: boolean,
  saveError: ?Error,
  formElementLookupToDelete: ?FormElementLookup,
  isDeleting: boolean,
  deleteError: ?Error,
}

declare type FormElementLookupSearchResponse = {
  formElementLookups: FormElementLookup[],
} & SearchResults

declare type FormElementDynamicOptionSetSearchResponse = {
  formElementDynamicOptionSets: FormElementDynamicOptionSet[],
} & SearchResults

declare type FormElementCalculationPath = {
  label: string,
  path: string,
  elements: FormElementCalculationPath[],
}

declare type FormElementsCalculationPath = FormElementCalculationPath[]
