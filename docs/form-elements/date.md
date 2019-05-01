# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Date Element

Allow the user to select a date. Submission data will be in [ISO_8601 Timestamp](https://en.wikipedia.org/wiki/ISO_8601) format.

| Property       | Required | Type      | Default  | Description                                                                                                                                 |
| -------------- | -------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`         | Yes      | `string`  | `'date'` | The type of Form Element.                                                                                                                   |
| `name`         | Yes      | `string`  |          | The key that will be assigned a value in the submission data when the form is submitted.                                                    |
| `label`        | Yes      | `string`  |          | Display text presented to the user above the input by default.                                                                              |
| `defaultValue` | No       | `string`  |          | A default value when the form is opened.                                                                                                    |
| `required`     | Yes      | `boolean` | `false`  | Determine if this input requires a date selected by the user (`true`) or not (`false`).                                                     |
| `readOnly`     | Yes      | `boolean` | `false`  | Determine if this input can be edited by the user (`false`) or not (`true`).                                                                |
| `fromDate`     | No       | `string`  |          | The earliest possible date that can be selected by the user. Must be in [ISO_8601 Timestamp](https://en.wikipedia.org/wiki/ISO_8601) format |
| `toDate`       | No       | `string`  |          | The latest possible date that can be selected by the user. Must be in [ISO_8601 Timestamp](https://en.wikipedia.org/wiki/ISO_8601) format   |

Date element also inherits the properties of the following:

-   [Base Element](./base-element.md)
-   [Lookup Element](./lookup-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "date",
  "name": "dateOfBirth",
  "label": "What is your D.O.B. (You must be over 18)",
  "defaultValue": "2001-01-01T14:00:00.000Z",
  "fromValue": "2001-01-01T14:00:00.000Z",
  "required": true,
  "readOnly": false
}
```
