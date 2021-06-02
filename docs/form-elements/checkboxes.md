# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Checkboxes Element

Allow the user to select multiple options from a list of options displayed as [checkboxes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox) or buttons.

| Property       | Required | Type      | Default        | Description                                                                                     |
| -------------- | -------- | --------- | -------------- | ----------------------------------------------------------------------------------------------- |
| `type`         | Yes      | `string`  | `'checkboxes'` | The type of Form Element.                                                                       |
| `name`         | Yes      | `string`  |                | The key that will be assigned a value in the submission data when the form is submitted.        |
| `label`        | Yes      | `string`  |                | Display text presented to the user above the input by default.                                  |
| `hint`         | No       | `string`  |                | A hint triggered by an icon tooltip to be displayed when hovering beside the element label.     |
| `defaultValue` | Yes      | `string`  |                | The identifier(s) of the options to be checked when the form is opened.                         |
| `required`     | Yes      | `boolean` | `false`        | Determines whether this element requires an option to be selected (`true`) or not (`false`).    |
| `readOnly`     | Yes      | `boolean` | `false`        | Determines whether the selected option(s) be changed by the user (`false`) or not (`true`).     |
| `buttons`      | Yes      | `boolean` | `false`        | Determines whether the options are displayed as buttons (`true`) or as radio buttons (`false`). |
| `canToggleAll` | No       | `boolean` | `false`        | Determine whether the `Select all` and `Deselect All` buttons will be shown.                    |

Checkboxes element also inherits the properties of the following:

- [Base Element](./base-element.md)
- [Options Element](./options-element.md)
- [Lookup Element](./lookup-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "checkboxes",
  "name": "colours",
  "label": "Which Colours do you Like?",
  "defaultValue": [
    "954af543-f500-4476-9403-f2ebc6c2260e",
    "51a282e8-4134-4d69-a18a-10440d5f4e12"
  ],
  "required": true,
  "readOnly": false,
  "buttons": true,
  "options": [
    {
      "id": "954af543-f500-4476-9403-f2ebc6c2260e",
      "value": "green",
      "label": "Green",
      "colour": "#43a047"
    },
    {
      "id": "51a282e8-4134-4d69-a18a-10440d5f4e12",
      "value": "red",
      "label": "Red",
      "colour": "#f44336"
    },
    {
      "id": "cf61d95f-658c-409f-b57e-d9c74d0fb9d1",
      "value": "grey",
      "label": "Grey",
      "colour": "#212121"

    }
  ]
}
```
