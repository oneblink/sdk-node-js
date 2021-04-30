# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Radio Element

Allow the user to select a single option from a list of options displayed as [radio buttons](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio) or buttons.

| Property       | Required | Type      | Default   | Description                                                                                 |
| -------------- | -------- | --------- | --------- | ------------------------------------------------------------------------------------------- |
| `type`         | Yes      | `string`  | `'radio'` | The type of Form Element.                                                                   |
| `name`         | Yes      | `string`  |           | The key that will be assigned a value in the submission data when the form is submitted.    |
| `label`        | Yes      | `string`  |           | Display text presented to the user above the input by default.                              |
| `hint`         | No       | `string`  |           | A hint triggered by an icon tooltip to be displayed when hovering beside the element label. |
| `defaultValue` | Yes      | `string`  |           | The identifier of an option to be selected when the form is opened.                         |
| `required`     | Yes      | `boolean` | `false`   | Determine if this element requires an option to be selected (`true`) or not (`false`).      |
| `readOnly`     | Yes      | `boolean` | `false`   | Determine if this selected option be changed by the user (`false`) or not (`true`).         |
| `buttons`      | Yes      | `boolean` | `false`   | Determine if this options are displayed as buttons (`true`) or as radio buttons (`false`).  |

Radio element also inherits the properties of the following:

- [Base Element](./base-element.md)
- [Options Element](./options-element.md)
- [Lookup Element](./lookup-element.md)

### Example Form Element

```json
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "radio",
  "name": "result",
  "label": "How did it go?",
  "defaultValue": "954af543-f500-4476-9403-f2ebc6c2260e",
  "required": true,
  "readOnly": false,
  "buttons": true,
  "options": [
    {
      "id": "954af543-f500-4476-9403-f2ebc6c2260e",
      "value": "pass",
      "label": "Pass",
      "colour": "#43a047"
    },
    {
      "id": "51a282e8-4134-4d69-a18a-10440d5f4e12",
      "value": "fail",
      "label": "Fail",
      "colour": "#f44336"
    },
    {
      "id": "cf61d95f-658c-409f-b57e-d9c74d0fb9d1",
      "value": "n/a",
      "label": "N/A",
      "colour": "#212121"
    }
  ]
}
```

### Example Submission Data

```json
{
  "submission": {
    "[element.name]": "pass"
  }
}
```
