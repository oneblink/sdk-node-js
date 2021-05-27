# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Telephone (Phone Number) Element

Allow the user to enter a phone number.

| Property           | Required | Type      | Default       | Description                                                                                 |
| ------------------ | -------- | --------- | ------------- | ------------------------------------------------------------------------------------------- |
| `type`             | Yes      | `string`  | `'telephone'` | The type of Form Element.                                                                   |
| `name`             | Yes      | `string`  |               | The key that will be assigned a value in the submission data when the form is submitted.    |
| `label`            | Yes      | `string`  |               | Display text presented to the user above the input by default.                              |
| `hint`             | No       | `string`  |               | A hint triggered by an icon tooltip to be displayed when hovering beside the element label. |
| `defaultValue`     | No       | `string`  |               | A default value when the form is opened.                                                    |
| `placeholderValue` | No       | `string`  |               | The content to appear in the form control when the form control is empty.                   |
| `required`         | Yes      | `boolean` | `false`       | Determine if this input requires a value entered by the user (`true`) or not (`false`).     |
| `readOnly`         | Yes      | `boolean` | `false`       | Determine if this input can be edited by the user (`false`) or not (`true`).                |

Telephone element also inherits the properties of the following:

- [Base Element](./base-element.md)
- [Lookup Element](./lookup-element.md)
- [Custom Validation Element](./custom-validation-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "telephone",
  "name": "phoneNumber",
  "label": "Contact Phone Number",
  "defaultValue": "0412 345 678",
  "required": true,
  "readOnly": false
}
```

### Example Submission Data

```json
{
  "submission": {
    "[element.name]": "0402123456"
  }
}
```
