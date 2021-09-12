# OneBlink SDK | FormSubmissionApprovalResponse Definition

[Back to Approvals](../../approvals.md)

## FormSubmissionApprovalResponse

| Property                   | Required | Type                                                                                                                  |
| -------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `formSubmissionMeta`       | Yes      | [FormSubmissionMeta](../form/FormSubmissionMeta.md#formsubmissionmeta)                                                |
| `formApprovalFlowInstance` | Yes      | [FormApprovalFlowInstance](./FormApprovalFlowInstance.md#formapprovalflowinstance)                                    |
| `formSubmissionApproval`   | Yes      | [FormSubmissionApproval](./FormSubmissionApproval.md#Formsubmissionapproval)                                          |
| `history`                  | Yes      | [FormSubmissionApprovalHistoryRecord[]](./FormSubmissionApprovalHistoryRecord.md#formsubmissionapprovalhistoryrecord) |
| `form`                     | Yes      | [Form](./form/README.md#form)                                                                                         |
