import {
  ApprovalTypes,
  EmailTemplateTypes,
  FormTypes,
  SubmissionTypes,
} from '@oneblink/types'
import jwksClient from 'jwks-rsa'
export * from '@oneblink/types'

export type ConstructorOptions = {
  accessKey: string
  secretKey: string
}

export type AWSCredentials = {
  AccessKeyId: string
  SecretAccessKey: string
  SessionToken: string
}

export type FormRetrievalData = {
  credentials: AWSCredentials
  s3: {
    bucket: string
    key: string
    region: string
  }
}

export type PreFillMeta = FormRetrievalData & {
  preFillFormDataId: string
}

export type BaseSearchResult = {
  meta: {
    limit: null
    offset: null
    nextOffset: null
  }
}

export type TenantBase = {
  awsRegion: string
}

export type TenantEnvironment = {
  apiOrigin: string
  pdfOrigin: string
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
  BaseSearchResult & {
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

export type EmailTemplatesSearchResult = {
  formsAppEnvironments: EmailTemplateTypes.EmailTemplate[]
} & BaseSearchResult

export type EmailTemplatesSearchOptions = {
  formsAppEnvironmentId: number
  limit?: number
  offset?: number
}
