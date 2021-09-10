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
  meta: {
    limit?: number
    offset?: number
    nextOffset?: number
  }
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
      limit,
      offset,
      ...rest
    }: {
      formsAppId: number
      formId?: number
      externalId?: string
      submissionid?: string
      submittedAfterDateTime?: string
      submittedBeforeDateTime?: string
      limit: number
      offset: number
      statuses?: string[]
      updatedAfterDateTime?: string
      updatedBeforeDateTime?: string
      lastUpdatedBy?: string[]
    }): Promise<FormSubmissionsAdministrationApprovalsResponse> {
      console.log('negligible change to test node16 tests')
      if (typeof formsAppId !== 'number') {
        throw new Error('"formsAppId" must be a number and is required')
      }
      if (typeof limit !== 'number' || typeof offset !== 'number') {
        throw new Error('"limit" and "offset" are required')
      }
      return await super.searchRequest(`/forms-apps/${formsAppId}/approvals`, {
        limit,
        offset,
        ...rest,
      })
    }
  }
