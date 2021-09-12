# OneBlink SDK | FormSubmissionMeta Definition

[Back to Documentation](../../README.md)

## FormSubmissionMeta

| Property            | Required | Type     | Description                                                   |
| ------------------- | -------- | -------- | ------------------------------------------------------------- |
| `submissionId`      | Yes      | `string` | The id of the submission.                                     |
| `formId`            | Yes      | `number` | The id of the form associated with the submission.            |
| `formsAppId`        | Yes      | `number` | The id of the forms app associated with the submission.       |
| `dateTimeSubmitted` | Yes      | `string` | The date and time (in ISO format) the submission was created. |

## Examples

### FormSubmissionMeta

```JSON
{
  "submissionId": "f1eadc2b-79c8-4f97-8d92-cde64b34911f",
  "formId": 2,
  "formsAppId": 1,
  "dateTimeSubmitted": "2021-08-06T12:00:00.00Z"
}
```
