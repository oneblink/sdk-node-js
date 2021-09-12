# OneBlink SDK | FormSubmissionApproval Definition

[Back to Documentation](../../README.md)

## FormSubmissionApproval

| Property                     | Required | Type                                                              | Description                                                                                                    |
| ---------------------------- | -------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `id`                         | Yes      | `string`                                                          | The id of the approval.                                                                                        |
| `formApprovalFlowInstanceId` | Yes      | `number`                                                          | The id of the associated [`FormApprovalFlowInstance`](./FormApprovalFlowInstance.md#formapprovalflowinstance). |
| `group`                      | Yes      | `string`                                                          | The name of the group associated with this approval.                                                           |
| `stepLabel`                  | Yes      | `string`                                                          | The name of the step associated with this approval.                                                            |
| `status`                     | Yes      | `'PENDING' \| 'APPROVED' \| 'CLARIFICATION_REQUIRED' \| 'CLOSED'` | The current status of this approval.                                                                           |
| `createdAt`                  | Yes      | `string`                                                          | The date and time (in ISO format) the approval was created.                                                    |
| `updatedAt`                  | Yes      | `string`                                                          | The date and time (in ISO format) the approval was last updated.                                               |
| `notificationEmailAddress`   | No       | `string[]`                                                        | An array of notification email addresses.                                                                      |
| `notes`                      | No       | `string`                                                          | The notes associated with the approval.                                                                        |
| `internalNotes`              | No       | `string`                                                          | The internal notes associated with the approval.                                                               |
| `updatedBy`                  | No       | `string`                                                          | The username that last updated the approval.                                                                   |

## Examples

### Form

```JSON
{
  "id": "a2fgdc5g-79c8-4f97-8d92-cde64b34956s",
  "formApprovalFlowInstanceId": 1,
  "group": "group1",
  "stepLabel": "Step 1",
  "status": "APPROVED",
  "createdAt": "2021-08-06T12:00:00.00Z",
  "updatedAt": "2021-08-06T12:00:00.00Z",
  "notificationEmailAddress": ["username@oneblink.io"],
  "notes": "Notes",
  "internalNotes": "Internal Notes",
  "updatedBy": "username"
}
```
