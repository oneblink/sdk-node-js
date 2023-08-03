import {
  ApprovalTypes,
  EmailTemplateTypes,
  EnvironmentTypes,
  FormTypes,
  SubmissionTypes,
  MiscTypes,
  AWSTypes,
  SchedulingTypes,
} from '@oneblink/types'
import { FormStoreRecord } from '@oneblink/types/typescript/submissions'
import { HeadObjectOutput } from 'aws-sdk/clients/s3'
import jwksClient from 'jwks-rsa'
import { SendMailOptions } from 'nodemailer'
export * from '@oneblink/types'

export { HeadObjectOutput }

export type ConstructorOptions = {
  accessKey: string
  secretKey: string
}

export type PreFillMeta = AWSTypes.FormS3Credentials & {
  preFillFormDataId: string
}

export type BaseSearchOptions = {
  /** Limit the number of results returned */
  limit?: number
  /**
   * Skip a specific number of results, used in conjunction with `limit` to
   * enforce paging
   */
  offset?: number
}

export type TenantBase = {
  awsRegion: string
}

export type TenantEnvironment = {
  apiOrigin: string
  jwtIssuer: string
}

export type TenantConfiguration = TenantBase & {
  test: TenantEnvironment
  prod: TenantEnvironment
}

export type Tenant = TenantBase &
  TenantEnvironment & {
    jwksInstance: jwksClient.JwksClient
  }

export type FormSubmissionApprovalHistoryRecord = {
  formSubmissionMeta: SubmissionTypes.FormSubmissionMeta
  formApprovalFlowInstance: ApprovalTypes.FormApprovalFlowInstance
  formSubmissionApprovals: ApprovalTypes.FormSubmissionApproval[]
}

export type FormSubmissionsAdministrationApprovalsResponse =
  MiscTypes.BaseSearchResult & {
    approvals: Array<
      FormSubmissionApprovalHistoryRecord & {
        history: FormSubmissionApprovalHistoryRecord[]
      }
    >
  }

export type FormSubmissionApprovalResponse = {
  formSubmissionMeta: SubmissionTypes.FormSubmissionMeta
  formSubmissionApproval: ApprovalTypes.FormSubmissionApproval
  formApprovalFlowInstance: ApprovalTypes.FormApprovalFlowInstance
  form: FormTypes.Form
  history: FormSubmissionApprovalHistoryRecord[]
}

export type FormApprovalFlowInstanceResponse = {
  formSubmissionMeta: SubmissionTypes.FormSubmissionMeta
  formApprovalFlowInstance: ApprovalTypes.FormApprovalFlowInstance
  form: FormTypes.Form
  formSubmissionApprovals: ApprovalTypes.FormSubmissionApproval[]
}

export type FormsSearchResult = {
  forms: FormTypes.Form[]
} & MiscTypes.BaseSearchResult

export type FormsSearchOptions = BaseSearchOptions & {
  /**
   * Search on the `isAuthenticated` property of a form. Must be either `true`
   * or `false` or not specified.
   */
  isAuthenticated?: boolean
  /**
   * Search on the `name` property of a form. Can be a prefix, suffix or partial
   * match
   */
  name?: string
  /**
   * Search on the `formsAppIds` property of a form. Must be the exact match of
   * one the ids in `formsAppIds`.
   */
  formsAppId?: number
  /**
   * Search on the `formsAppEnvironmentId` property of a form. Must be the exact
   * match of a `formsAppEnvironmentId`.
   */
  formsAppEnvironmentId?: number
}

export type FormSubmissionHistorySearchParameters = BaseSearchOptions & {
  /** Search for Submissions for a particular form Id */
  formId: number
  /** Search for Submissions starting at this date */
  submissionDateFrom?: string
  /** Search for Submissions ending on this date */
  submissionDateTo?: string
  /**
   * Search for only valid submissions, only invalid ones, or emit this property
   * to search all
   */
  isValid?: boolean
  /** Search for submission that contain this title */
  submissionTitle?: string
}

export type FormSubmissionHistorySearchResults = MiscTypes.BaseSearchResult & {
  formSubmissionMeta: SubmissionTypes.FormSubmissionMeta[]
}

export type EmailTemplatesSearchResult = {
  emailTemplates: EmailTemplateTypes.EmailTemplate[]
} & MiscTypes.BaseSearchResult

export type EmailTemplatesSearchOptions = BaseSearchOptions

export type FormSubmissionMetaResult = {
  /** The meta record for the submission */
  formSubmissionMeta: SubmissionTypes.FormSubmissionMeta
  /**
   * The approval flow related to the submission if the form had an approval
   * flow configured at the time of submission
   */
  formApprovalFlowInstance?: ApprovalTypes.FormApprovalFlowInstance
  /**
   * The approvals related to the approval flow if the form had an approval flow
   * configured at the time of submission
   */
  formSubmissionApprovals?: ApprovalTypes.FormSubmissionApproval[]
  /**
   * The payments made after the submission if the form had a payment event
   * configured at the time of submission
   */
  formSubmissionPayments?: SubmissionTypes.FormSubmissionPayment[]
  /** The workflow events containing a status for each */
  formSubmissionWorkflowEvents?: SubmissionTypes.FormSubmissionWorkflowEvent[]
  /**
   * The bookings made after the submission if the form had a scheduling vent
   * configured at the time of submission
   */
  formSubmissionSchedulingBooking?: SchedulingTypes.SchedulingBooking
}

export { SendMailOptions }

export type SendEmailResult = {
  envelope: {
    from: string
    to: string[]
  }
  messageId: string
  response: string
  raw: string
}

export type FormsAppEnvironmentsSearchResult = {
  formsAppEnvironments: EnvironmentTypes.FormsAppEnvironment[]
} & MiscTypes.BaseSearchResult

export type FormsAppEnvironmentsSearchOptions = BaseSearchOptions

export type JobsSearchResult = MiscTypes.BaseSearchResult & {
  jobs: SubmissionTypes.FormsAppJob[]
}

export type DataManagerRegexFilter = {
  /**
   * The Regular expression to search with. This can just be a simple string if
   * desired.
   */
  $regex: string
  /**
   * Regex options. String with any combination of the following characters:
   * d,g,i,m,s,u,y.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags
   */
  $options?: string
}

export type DataManagerNumberFilter = {
  /** Equal to */
  $eq?: number
  /** Greater than */
  $gt?: number
  /** Greater than or Equal to */
  $gte?: number
  /** Less than */
  $lt?: number
  /** Less than or Equal to */
  $lte?: number
}

export type DataManagerMultipleSelectionsArrayFilter = {
  $elemMatch: {
    /**
     * The array of strings to match. Records will be returned if any of the
     * values in the record matches any of these
     */
    $in: Array<string>
  }
}

export type DataManagerStringArrayFilter = {
  /**
   * The array of strings to match. Records will be returned if the value in the
   * record matches any of these
   */
  $in: Array<string>
}

export type DataManagerStringArrayComplianceFilter = {
  /** The filter for the value */
  value?: DataManagerStringArrayFilter
  /** The filter for the notes */
  notes?: DataManagerRegexFilter
}

export type DataManagerBooleanFilter = {
  /** The boolean value to match */
  $eq: boolean
}

export type DataManagerDateTimeFilter = {
  /** Equal to */
  $eq?: string
  /** Greater than */
  $gt?: string
  /** Greater than or Equal to */
  $gte?: string
  /** Less than */
  $lt?: string
  /** Less than or Equal to */
  $lte?: string
}

export type DataManagerUUIDFilter = {
  /** The UUID string to match */
  $eq: string
}

export type DataManagerFreshdeskDependentFieldFilter = {
  /**
   * The filter for the `category`. This property is treated as a non multi
   * `select` element.
   */
  category?: DataManagerStringArrayFilter
  /**
   * The filter for the `subCategory`. This property is treated as a non multi
   * `select` element.
   */
  subCategory?: DataManagerStringArrayFilter
  /**
   * The filter for the `item`. This property is treated as a non multi `select`
   * element.
   */
  item?: DataManagerStringArrayFilter
}

export type DataManagerNestedFilterFilter = {
  /**
   * The filter for an element in a `repeatableSet` or `form` element. Use
   * whichever filter type is appropriate for each element type.
   */
  [elementName: string]: DataManagerSubmissionPropertyFilter
}

/**
 * Element of type: text, textarea, email, telephone, barcodeScanner: USE
 * `DataManagerRegexFilter`.
 *
 * Element of type: number, calculation: USE `DataManagerNumberFilter`.
 *
 * Element of type: compliance: USE `DataManagerStringArrayComplianceFilter`.
 *
 * Element of type: checkboxes, select (multi): USE
 * `DataManagerMultipleSelectionsArrayFilter`.
 *
 * Element of type: radio, autocomplete, select: USE
 * `DataManagerStringArrayFilter`.
 *
 * Element of type: boolean: USE `DataManagerBooleanFilter`.
 *
 * Element of type: date, datetime, time: USE `DataManagerDateTimeFilter`.
 *
 * Element of type: freshdeskDependentField : USE
 * `DataManagerFreshdeskDependentFieldFilter`.
 *
 * - Element of type: form, repeatableSet : USE `DataManagerNestedFilterFilter`.
 *   `repeatableSet` requires `unwindRepeatableSets` be `true`
 */
export type DataManagerSubmissionPropertyFilter =
  | DataManagerRegexFilter
  | DataManagerNumberFilter
  | DataManagerStringArrayComplianceFilter
  | DataManagerMultipleSelectionsArrayFilter
  | DataManagerStringArrayFilter
  | DataManagerBooleanFilter
  | DataManagerDateTimeFilter
  | DataManagerFreshdeskDependentFieldFilter

export type SearchDataManagerRecordsOptions = {
  formId: number
  /** Required for filtering by `repeatableSets` */
  unwindRepeatableSets?: boolean
  paging?: {
    /** Limit results to between 1 and 50. Used for pagination. Default: 50 */
    limit?: number
    /** Offset results. Used for pagination. Default: 0 */
    offset?: number
  }
  /** Sort results. */
  sorting?: Array<{
    /** The property to sort by e.g. "submission.Element_Name" */
    property: string
    /** The direction to sort this property by. */
    direction: 'ascending' | 'descending'
  }>
  filters?: {
    /**
     * Filter by `dateTimeSubmitted`. All values as a date ISO string:
     * https://en.wikipedia.org/wiki/ISO_8601
     */
    dateTimeSubmitted?: {
      /** Equal to */
      $eq?: string
      /** Greater than */
      $gt?: string
      /** Greater than or Equal to */
      $gte?: string
      /** Less than */
      $lt?: string
      /** Less than or Equal to */
      $lte?: string
    }
    /** Filter by `submissionId`. A uuid string. */
    submissionId?: DataManagerUUIDFilter
    /** Filter by `externalId`. */
    externalId?: DataManagerRegexFilter
    /** Filter by `submittedBy`. */
    submittedBy?: DataManagerRegexFilter
    /** Filter by values in the submission. */
    submission?: Record<string, DataManagerSubmissionPropertyFilter>
  }
}

export type SearchDataManagerRecordsResponse = {
  meta: {
    limit: number
    offset: number
    nextOffset?: number
  }
  submissions: Array<FormStoreRecord>
}

export type FormElementLookupSearchResult = {
  formElementLookups: FormTypes.FormElementLookup[]
} & MiscTypes.BaseSearchResult

export type FormElementListSearchResult = {
  formElementLists: FormTypes.FormElementOptionSet[]
} & MiscTypes.BaseSearchResult

export type FormElementListSearchOptions = BaseSearchOptions & {
  organisationId: string
}
