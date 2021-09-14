# OneBlink SDK | Approvals Class

## Instance Functions

- [`searchFormSubmissionAdministrationApprovals()`](#searchformsubmissionadministrationapprovals)
- [`getFormSubmissionApproval()`](#getformsubmissionapproval)
- [`getFormApprovalFlowInstance()`](#getformapprovalflowinstance)

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

## searchFormSubmissionAdministrationApprovals

### Example

```javascript
const { approvals, meta } =
  await approvals.searchFormSubmissionAdministrationApprovals({
    formsAppId: 1,
    formId: 2,
    limit: 50,
    offset: 0,
  })
// Use data here...
```

### Parameters

An object containing the following keys:

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

[`FormSubmissionsAdministrationApprovalsResponse`](./types/approvals/FormSubmissionsAdministrationApprovalsResponse.md)

## getFormSubmissionApproval

### Example

```javascript
const formSubmissionApproval = await approvals.getFormSubmissionApproval(
  'aaaaaaaa-bbbb-4543-cccc-addddd543454',
)
// Use data here...
```

### Parameters

An object containing the following keys:

| Parameter | Required | Type     | Description                            |
| --------- | -------- | -------- | -------------------------------------- |
| `id`      | Yes      | `string` | The id of the form submission approval |

### Result (Resolved Promise)

[`FormSubmissionApprovalResponse`](./types/approvals/FormSubmissionApprovalResponse.md)

## getFormApprovalFlowInstance

### Example

```javascript
const formSubmissionApproval = await approvals.getFormApprovalFlowInstance(1)
// Use data here...
```

### Parameters

An object containing the following keys:

| Parameter | Required | Type     | Description                               |
| --------- | -------- | -------- | ----------------------------------------- |
| `id`      | Yes      | `number` | The id of the form approval flow instance |

### Result (Resolved Promise)

[`FormApprovalFlowInstanceResponse`](./types/approvals/FormApprovalFlowInstanceResponse.md)
