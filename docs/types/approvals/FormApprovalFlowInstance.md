# OneBlink SDK | FormApprovalFlowInstance Definition

[Back to Documentation](../../README.md)

## FormApprovalFlowInstance

| Property                           | Required | Type                                                                                          | Description                                                      |
| ---------------------------------- | -------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `id`                               | Yes      | `number`                                                                                      | The id of the approval.                                          |
| `formId`                           | Yes      | `number`                                                                                      | The id of the associated `form`.                                 |
| `submissionId`                     | Yes      | `string`                                                                                      | The id of the submission associated with this instance.          |
| `steps`                            | Yes      | [`FormApprovalFlowInstanceStep[]`](#formapprovalflowinstancestep.md)                          | The steps for this instance.                                     |
| `isLatest`                         | Yes      | `boolean`                                                                                     | Whether this instance is the latest one.                         |
| `status`                           | Yes      | `'PENDING' \| 'CLARIFICATION_RECEIVED' \| 'APPROVED' \| 'CLARIFICATION_REQUIRED' \| 'CLOSED'` | The current status of this instance.                             |
| `createdAt`                        | Yes      | `string`                                                                                      | The date and time (in ISO format) the instance was created.      |
| `updatedAt`                        | Yes      | `string`                                                                                      | The date and time (in ISO format) the instance was last updated. |
| `previousFormSubmissionApprovalId` | No       | `string`                                                                                      | The date and time (in ISO format) the instance was last updated. |
| `lastUpdatedBy`                    | No       | `string`                                                                                      | The username that last updated the instance.                     |

## FormApprovalFlowInstanceStep

| Property                           | Required                     | Type                                                                                 | Description                                                           |
| ---------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| `group`                            | Yes                          | `string`                                                                             | The group associated with the step.                                   |
| `label`                            | Yes                          | `string`                                                                             | The label for the step.                                               |
| `isSkipped`                        | Yes                          | `boolean`                                                                            | Whether the step has/will be/been skipped.                            |
| `isConditional`                    | No                           | `boolean`                                                                            | Whether the step will be conditionally run.                           |
| `requiresAllConditionalPredicates` | No                           | `boolean`                                                                            | Whether all the conditional predicates are required to evaluate true. |
| `conditionalPredicates`            | If `isConditional` is `true` | [`ConditionalPredicate[]`](../../form-elements/base-element.md#conditionalpredicate) | The conditional predicates to evaluate.                               |

## Examples

### FormApprovalFlowInstance

```JSON
{
  "id": "a2fgdc5g-79c8-4f97-8d92-cde64b34956s",
  "formId": 1,
  "submissionId": "c1f0f27b-4289-4ce5-9807-bf84971991aa",
  "steps": [],
  "isLatest": true,
  "status": "APPROVED",
  "createdAt": "2021-08-06T12:00:00.00Z",
  "updatedAt": "2021-08-06T12:00:00.00Z",
  "previousFormSubmissionApprovalId": "a2fgdc5g-79c8-4f97-8d92-cde64b34956s",
  "lastUpdatedBy": "username"
}
```

### FormApprovalFlowInstanceStep

```JSON
{
  "group": "group 1",
  "label": "Step 1",
  "isSkipped": false,
  "isConditional": true,
  "requiresAllConditionalPredicates": true,
  "conditionalPredicates": []
}
```
