# OneBlink SDK | FormSubmissionsAdministrationApprovalsResponse Definition

[Back to Approvals](../../approvals.md)

## FormSubmissionsAdministrationApprovalsResponse

| Property    | Required | Type                              |
| ----------- | -------- | --------------------------------- |
| `approvals` | Yes      | [`ApprovalItem[]`](#approvalitem) |
| `meta`      | Yes      | `number`                          |

## ApprovalItem

| Property                   | Required | Type                                                                                                                  |
| -------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `formSubmissionMeta`       | Yes      | [FormSubmissionMeta](../form/FormSubmissionMeta.md#formsubmissionmeta)                                                |
| `formApprovalFlowInstance` | Yes      | [FormApprovalFlowInstance](./FormApprovalFlowInstance.md#formapprovalflowinstance)                                    |
| `formSubmissionApprovals`  | Yes      | [FormSubmissionApproval[]](./FormSubmissionApproval.md#Formsubmissionapproval)                                        |
| `history`                  | Yes      | [FormSubmissionApprovalHistoryRecord[]](./FormSubmissionApprovalHistoryRecord.md#formsubmissionapprovalhistoryrecord) |

## Meta

| Property     | Required | Type         |
| ------------ | -------- | ------------ |
| `limit`      | No       | `number`     |
| `offset`     | No       | `offset`     |
| `nextOffset` | No       | `nextOffset` |
