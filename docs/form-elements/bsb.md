# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## BSB Element

Allow the user to enter a valid BSB number(as per https://bsb.auspaynet.com.au/public/BSB_DB.NSF/publicBSB.xsp).

| Property           | Required | Type      | Default | Description                                                                              |
| ------------------ | -------- | --------- | ------- | ---------------------------------------------------------------------------------------- |
| `type`             | Yes      | `string`  | `'bsb'` | The type of Form Element.                                                                |
| `name`             | Yes      | `string`  |         | The key that will be assigned a value in the submission data when the form is submitted. |
| `label`            | Yes      | `string`  |         | Display text presented to the user above the input by default.                           |
| `defaultValue`     | No       | `string`  |         | A default value when the form is opened.                                                 |
| `placeholderValue` | No       | `string`  |         | The content to appear in the form control when the form control is empty.                |
| `required`         | Yes      | `boolean` | `false` | Determine if this input requires a value entered by the user (`true`) or not (`false`).  |
| `readOnly`         | Yes      | `boolean` | `false` | Determine if this input can be edited by the user (`false`) or not (`true`).             |

BSB element also inherits the properties of the following:

- [Base Element](./base-element.md)
- [Lookup Element](./lookup-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "bsb",
  "name": "BSB",
  "label": "Please Enter Your BSB number",
  "defaultValue": "923-100",
  "required": true,
  "readOnly": false
}
```

### Example Submission Data

```json
{
  "submission": {
    "[element.name]": "923-100"
  }
}
```
