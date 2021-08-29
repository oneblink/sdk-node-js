# OneBlink SDK | Approvals Class

## Constructor

| Parameter           | Required | Type     | Description                                                       |
| ------------------- | -------- | -------- | ----------------------------------------------------------------- |
| `options.accessKey` | Yes      | `string` | Access key provided by OneBlink, requires the `FORMS` permission. |
| `options.secretKey` | Yes      | `string` | Secret key provided by OneBlink, requires the `FORMS` permission. |

### Example

```javascript
const OneBlink = require('@oneblink/sdk')

const options = {
  accessKey: '123455678901ABCDEFGHIJKL',
  secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
}
const approvals = new OneBlink.Approvals(options)
```

## getFormSubmissionAdministrationApprovals

### Example

```javascript
const { approvals, meta } =
  await approvals.getFormSubmissionAdministrationApprovals({
    formsAppId: 1,
    formId: 2,
    limit: 50,
    offset: 0,
  })
// Use data here...
```

### Parameters

AN object containing the following keys:

| Parameter                 | Required | Type       | Description                                                                                                                       |
| ------------------------- | -------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `formsAppId`              | Yes      | `number`   | The formsAppId of the approvals app                                                                                               |
| `limit`                   | Yes      | `number`   | The number of results to return. Maximum is 50                                                                                    |
| `offset`                  | Yes      | `number`   | The offset of the results to return. Use this in conjunction with `limit` for pagination                                          |
| `formId`                  | No       | `number`   | The formId of the approvals                                                                                                       |
| `externalId`              | No       | `string`   | An exact externalId to search by                                                                                                  |
| `submissionId`            | No       | `string`   | An exact submissionId to search by                                                                                                |
| `submittedAfterDateTime`  | No       | `string`   | The date submitted after as an ISO string                                                                                         |
| `submittedBeforeDateTime` | No       | `string`   | The date submitted before as an ISO string                                                                                        |
| `statuses`                | No       | `string[]` | An array of statuses to filter by (`'PENDING'`, `'CLARIFICATION_RECEIVED'`, `'CLARIFICATION_REQUIRED'`, `'APPROVED'`, `'CLOSED'`) |
| `updatedAfterDateTime`    | No       | `string`   | The date updated after as an ISO string                                                                                           |
| `updatedBeforeDateTime`   | No       | `string`   | The date updated before as an ISO string                                                                                          |
| `lastUpdatedBy`           | No       | `string[]` | An array of usernames to filter by                                                                                                |

### Result (Resolved Promise)

```json
{
  "approvals": [
    {
      "formSubmissionMeta": {
        "submissionId": "f1eadc2b-79c8-4f97-8d92-cde64b34911f",
        "formId": 2,
        "formsAppId": 1,
        "dateTimeSubmitted": "2021-08-06T12:00:00.00Z"
      },
      "formApprovalFlowInstance": {
        "id": 1,
        "createdAt": "2021-08-06T12:00:00.00Z",
        "formId": 2,
        "submissionId": "f1eadc2b-79c8-4f97-8d92-cde64b34911f",
        "approvalsFormsAppId": 1,
        "steps": [
          {
            "group": "group1",
            "label": "Step 1",
            "isSkipped": false
          }
        ],
        "status": "APPROVED",
        "isLatest": true
      },
      "formSubmissionApprovals": [
        {
          "group": "group1",
          "formApprovalFlowInstanceId": 1,
          "stepLabel": "Step 1",
          "id": "a2fgdc5g-79c8-4f97-8d92-cde64b34956s",
          "status": "APPROVED",
          "createdAt": "2021-08-06T12:00:00.00Z",
          "updatedAt": "2021-08-06T12:00:00.00Z"
        }
      ],
      "history": []
    }
  ],
  "meta": {
    "offset": 0,
    "limit": 50,
    "nextOffset": 50
  }
}
```
