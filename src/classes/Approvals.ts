import OneBlinkAPI from '../lib/one-blink-api'
import { SubmissionTypes, ApprovalTypes } from '@oneblink/types'
import { Tenant, ConstructorOptions } from '../lib/types'

export type FormSubmissionsAdministrationApprovalsResponse = {
  approvals: Array<{
    formSubmissionMeta: SubmissionTypes.FormSubmissionMeta
    formApprovalFlowInstance: ApprovalTypes.FormApprovalFlowInstance
    formSubmissionApprovals: ApprovalTypes.FormSubmissionApproval[]
    history: Array<{
      formSubmissionMeta: SubmissionTypes.FormSubmissionMeta
      formApprovalFlowInstance: ApprovalTypes.FormApprovalFlowInstance
      formSubmissionApprovals: ApprovalTypes.FormSubmissionApproval[]
    }>
  }>
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (tenant: Tenant) =>
  class Approvals extends OneBlinkAPI {
    constructor(options: ConstructorOptions) {
      options = options || {}
      super(options.accessKey, options.secretKey, tenant)
    }

    async getFormSubmissionAdministrationApprovals({
      formsAppId,
      ...rest
    }: {
      formsAppId: number
      formId?: number
      externalId?: string
      submissionid?: string
      submittedAfterDateTime?: string
      submittedBeforeDateTime?: string
      limit?: number
      offset?: number
      statuses?: string[]
    }): Promise<FormSubmissionsAdministrationApprovalsResponse> {
      if (typeof formsAppId !== 'number') {
        throw new Error('formsAppId must be a number and is required')
      }
      return await super.searchRequest(`/forms`, {
        ...rest,
      })
    }
  }
