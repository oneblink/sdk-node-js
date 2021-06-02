# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Select Element

Allow the user to select a single option or multiple options from a list of options.

| Property       | Required | Type      | Default    | Description                                                                                                                               |
| -------------- | -------- | --------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `type`         | Yes      | `string`  | `'select'` | The type of Form Element.                                                                                                                 |
| `name`         | Yes      | `string`  |            | The key that will be assigned a value in the submission data when the form is submitted.                                                  |
| `label`        | Yes      | `string`  |            | Display text presented to the user above the input by default.                                                                            |
| `hint`         | No       | `string`  |            | A hint triggered by an icon tooltip to be displayed when hovering beside the element label.                                               |
| `defaultValue` | Yes      | `string`  |            | The identifier of the option(s) to be selected when the form is opened.                                                                   |
| `required`     | Yes      | `boolean` | `false`    | Determines whether this element requires an option to be selected (`true`) or not (`false`).                                              |
| `readOnly`     | Yes      | `boolean` | `false`    | Determines whether the selected option(s) be changed by the user (`false`) or not (`true`).                                               |
| `multi`        | Yes      | `boolean` | `false`    | Determines whether this select input allows multiple options to be selected (`true`) or not (`false`).                                    |
| `canToggleAll` | No       | `boolean` | `false`    | Determines whether the `Select all` and `Deselect All` buttons will be shown. (Will only be set if the `multi` property is set to `true`) |

Select element also inherits the properties of the following:

- [Base Element](./base-element.md)
- [Options Element](./options-element.md)
- [Lookup Element](./lookup-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "select",
  "name": "result",
  "label": "How did it go?",
  "defaultValue": "954af543-f500-4476-9403-f2ebc6c2260e",
  "required": true,
  "readOnly": false,
  "multi": false,
  "options": [
    {
      "id": "954af543-f500-4476-9403-f2ebc6c2260e",
      "value": "pass",
      "label": "Pass"
    },
    {
      "id": "51a282e8-4134-4d69-a18a-10440d5f4e12",
      "value": "fail",
      "label": "Fail"
    },
    {
      "id": "cf61d95f-658c-409f-b57e-d9c74d0fb9d1",
      "value": "n/a",
      "label": "N/A"

    }
  ]
}
```
