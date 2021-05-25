# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Date Element

Allow the user to select a date. Submission data will be in [ISO_8601 Timestamp](https://en.wikipedia.org/wiki/ISO_8601) format.

| Property                 | Required | Type      | Default  | Description                                                                                                                                                                                                                                                   |
| ------------------------ | -------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`                   | Yes      | `string`  | `'date'` | The type of Form Element.                                                                                                                                                                                                                                     |
| `name`                   | Yes      | `string`  |          | The key that will be assigned a value in the submission data when the form is submitted.                                                                                                                                                                      |
| `label`                  | Yes      | `string`  |          | Display text presented to the user above the input by default.                                                                                                                                                                                                |
| `hint`                   | No       | `string`  |          | A hint triggered by an icon tooltip to be displayed when hovering beside the element label.                                                                                                                                                                   |
| `defaultValue`           | No       | `string`  |          | A default value when the form is opened. Must be a string formatted as `'YYYY-MM-DD'`, or the string `'NOW'` to denote that `defaultValueDaysOffset` will also be used to dynamically offset the `defaultValue` from the time the form is loaded.             |
| `defaultValueDaysOffset` | No       | `number`  |          | This value can only be set if `defaultValue` is `NOW`. It can be a negative or positive number.                                                                                                                                                               |
| `placeholderValue`       | No       | `string`  |          | The content to appear in the form control when the form control is empty.                                                                                                                                                                                     |
| `required`               | Yes      | `boolean` | `false`  | Determine if this input requires a date selected by the user (`true`) or not (`false`).                                                                                                                                                                       |
| `readOnly`               | Yes      | `boolean` | `false`  | Determine if this input can be edited by the user (`false`) or not (`true`).                                                                                                                                                                                  |
| `fromDate`               | No       | `string`  |          | The earliest possible date that can be selected by the user. Must be a string formatted as `'YYYY-MM-DD'`, or the string `'NOW'` to denote that `fromDateDaysOffset` will also be used to dynamically offset the `fromDate` from the time the form is loaded. |
| `toDate`                 | No       | `string`  |          | The latest possible date that can be selected by the user. Must be a string formatted as `'YYYY-MM-DD'`, or the string `'NOW'` to denote that `toDateDaysOffset` will also be used to dynamically offset the `toDate` from the time the form is loaded.       |
| `fromDateDaysOffset`     | No       | `number`  |          | This value can only be set if `fromDate` is `NOW`. It can be a negative or positive number, but must be less than `toDateDaysOffset` if passed.                                                                                                               |
| `toDateDaysOffset`       | No       | `number`  |          | This value can only be set if `toDate` is set to `NOW`. It can be a negative or positive number, but must be greater than `fromDateDaysOffset` if passed.                                                                                                     |

Date element also inherits the properties of the following:

- [Base Element](./base-element.md)
- [Lookup Element](./lookup-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "date",
  "name": "dateOfBirth",
  "label": "What is your D.O.B.",
  "hint": "You must be over 18",
  "defaultValue": "2000-01-01",
  "fromDate": "1990-01-01",
  "toDate": "NOW",
  "toDateDaysOffset": -365,
  "required": true,
  "readOnly": false
}
```

### Example Submission Data

```json
{
  "submission": {
    "[element.name]": "2001-01-01"
  }
}
```
