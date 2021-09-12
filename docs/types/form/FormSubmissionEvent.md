# OneBlink SDK | FormSubmissionEvent Definition

[Back to Forms](./README.md)

## FormSubmissionEvent

| Property        | Required | Type                                                                                                                                          | Description                                             |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `isDraft`       | No       | `boolean`                                                                                                                                     | Whether the submission event should run for drafts.     |
| `type`          | Yes      | `'CALLBACK' \| 'PDF' \| 'ONEBLINK_API' \| 'TRIM' \| 'BPOINT' \| 'WESTPAC_QUICK_WEB' \| 'CP_PAY' \| 'CIVICA_CRM' \| 'CP_HCMS' \| 'SCHEDULING'` | The type of submission event.                           |
| `configuration` | Yes      | [`FormSubmissionEventConfiguration`](./FormSubmissionEventConfiguration.md)                                                                   | Configuration specific to the type of submission event. |

### Example

```JSON
{
  "isDraft": false,
  "type": "PDF",
  "configuration": {
    // Configuration data
  }
}
```
