# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Datetime Element

Allow the user to select a date and time. Submission data will be in [ISO_8601 Timestamp](https://en.wikipedia.org/wiki/ISO_8601) format.

| Property                 | Required | Type      | Default      | Description                                                                                                                                                                                                                                                                                            |
| ------------------------ | -------- | --------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`                   | Yes      | `string`  | `'datetime'` | The type of Form Element.                                                                                                                                                                                                                                                                              |
| `name`                   | Yes      | `string`  |              | The key that will be assigned a value in the submission data when the form is submitted.                                                                                                                                                                                                               |
| `label`                  | Yes      | `string`  |              | Display text presented to the user above the input by default.                                                                                                                                                                                                                                         |
| `hint`                   | No       | `string`  |              | A hint triggered by an icon tooltip to be displayed when hovering beside the element label.                                                                                                                                                                                                            |
| `defaultValue`           | No       | `string`  |              | A default value when the form is opened. Must be in [ISO_8601 Timestamp](https://en.wikipedia.org/wiki/ISO_8601) format, or the string 'NOW' to denote that `defaultValueDaysOffset` will also be used to dynamically offset the `defaultValue` from the time the form is loaded.                      |
| `defaultValueDaysOffset` | No       | `number`  |              | This value can only be set if `defaultValue` is `NOW`. It can be a negative or positive number.                                                                                                                                                                                                        |
| `placeholderValue`       | No       | `string`  |              | The content to appear in the form control when the form control is empty.                                                                                                                                                                                                                              |
| `required`               | Yes      | `boolean` | `false`      | Determine if this input requires a date and time selected by the user (`true`) or not (`false`).                                                                                                                                                                                                       |
| `readOnly`               | Yes      | `boolean` | `false`      | Determine if this input can be edited by the user (`false`) or not (`true`).                                                                                                                                                                                                                           |
| `fromDate`               | No       | `string`  |              | The earliest possible date and time that can be selected by the user. Must be in [ISO_8601 Timestamp](https://en.wikipedia.org/wiki/ISO_8601) format, or the string 'NOW' to denote that `fromDateDaysOffset` will also be used to dynamically offset the `fromDate` from the time the form is loaded. |
| `toDate`                 | No       | `string`  |              | The latest possible date and time that can be selected by the user. Must be in [ISO_8601 Timestamp](https://en.wikipedia.org/wiki/ISO_8601) format, or the string 'NOW' to denote that `toDateDaysOffset` will also be used to dynamically offset the `toDate` from the time the form is loaded.       |
| `fromDateDaysOffset`     | No       | `number`  |              | This value can only be set if `fromDate` is set to `NOW`. It can be a negative or positive number, but must be less than `toDateDaysOffset` if passed.                                                                                                                                                 |
| `toDateDaysOffset`       | No       | `number`  |              | This value can only be set if `toDate` is set to `NOW`. It can be a negative or positive number, but must be greater than `fromDateDaysOffset` if passed.                                                                                                                                              |

Datetime element also inherits the properties of the following:

- [Base Element](./base-element.md)
- [Lookup Element](./lookup-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "datetime",
  "name": "when",
  "label": "When did it occur?",
  "defaultValue": "NOW",
  "defaultValueDaysOffset": -1,
  "fromValue": "2000-01-01T14:00:00.000Z",
  "toDate": "NOW",
  "required": true,
  "readOnly": false
}
```

### Example Submission Data

```json
{
  "submission": {
    "[element.name]": "2000-01-01T14:00:00.000Z"
  }
}
```
