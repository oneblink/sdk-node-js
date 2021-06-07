# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Switch Element

Allow the user to to toggle a switch on or off.

| Property       | Required | Type      | Default     | Description                                                                                 |
| -------------- | -------- | --------- | ----------- | ------------------------------------------------------------------------------------------- |
| `type`         | Yes      | `string`  | `'boolean'` | The type of Form Element.                                                                   |
| `name`         | Yes      | `string`  |             | The key that will be assigned a value in the submission data when the form is submitted.    |
| `label`        | Yes      | `string`  |             | Display text presented to the user above the input by default.                              |
| `hint`         | No       | `string`  |             | A hint triggered by an icon tooltip to be displayed when hovering beside the element label. |
| `defaultValue` | Yes      | `boolean` |             | The boolean value to set the switch to on or off when the form is opened.                   |
| `required`     | Yes      | `boolean` | `false`     | Determines whether this element is required to be toggled on.                               |
| `readOnly`     | Yes      | `boolean` | `false`     | Determines whether this element can be toggled by the user.                                 |

Switch elements also inherits the properties of the following:

- [Base Element](./base-element.md)
- [Lookup Element](./lookup-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "boolean",
  "name": "termsAndConditions",
  "label": "Agree to terms and conditions?",
  "defaultValue": false,
  "required": true,
  "readOnly": false,
}
```

### Example Submission Data

```json
{
  "submission": {
    "[element.name]": true
  }
}
```
