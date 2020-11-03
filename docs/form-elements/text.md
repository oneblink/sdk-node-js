# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Text Element

Allow the user to enter a value in a single-line text input.

| Property           | Required | Type      | Default  | Description                                                                              |
| ------------------ | -------- | --------- | -------- | ---------------------------------------------------------------------------------------- |
| `type`             | Yes      | `string`  | `'text'` | The type of Form Element.                                                                |
| `name`             | Yes      | `string`  |          | The key that will be assigned a value in the submission data when the form is submitted. |
| `label`            | Yes      | `string`  |          | Display text presented to the user above the input by default.                           |
| `defaultValue`     | No       | `string`  |          | A default value when the form is opened.                                                 |
| `placeholderValue` | No       | `string`  |          | The content to appear in the form control when the form control is empty.                |
| `minLength`        | No       | `string`  |          | The minimum length required for the entered text value.                                  |
| `maxLength`        | No       | `string`  |          | The maximum length allowed for the entered text value.                                   |
| `required`         | Yes      | `boolean` | `false`  | Determine if this input requires a value entered by the user (`true`) or not (`false`).  |
| `readOnly`         | Yes      | `boolean` | `false`  | Determine if this input can be edited by the user (`false`) or not (`true`).             |

Text element also inherits the properties of the following:

- [Base Element](./base-element.md)
- [Lookup Element](./lookup-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "text",
  "name": "fullName",
  "label": "Please Enter Your Full Name",
  "defaultValue": "John Smith",
  "required": true,
  "readOnly": false
}
```
