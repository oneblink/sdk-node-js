# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Autocomplete Element

Allows the user to select a single option from a list of options which can be filtered by the user with a single-line text input.

| Property           | Required | Type      | Default          | Description                                                                                                                                                                                                                                                                                |
| ------------------ | -------- | --------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`             | Yes      | `string`  | `'autocomplete'` | The type of Form Element.                                                                                                                                                                                                                                                                  |
| `name`             | Yes      | `string`  |                  | The key that will be assigned a value in the submission data when the form is submitted.                                                                                                                                                                                                   |
| `label`            | Yes      | `string`  |                  | Display text presented to the user above the input by default.                                                                                                                                                                                                                             |
| `hint`             | No       | `string`  |                  | A hint triggered by an icon tooltip to be displayed when hovering beside the element label.                                                                                                                                                                                                |
| `required`         | Yes      | `boolean` | `false`          | Determine if this element requires an option to be selected (`true`) or not (`false`).                                                                                                                                                                                                     |
| `readOnly`         | Yes      | `boolean` | `false`          | Determine if this selected option be changed by the user (`false`) or not (`true`).                                                                                                                                                                                                        |
| `defaultValue`     | No       | `string`  |                  | The identifier of an option to be selected when the form is opened.                                                                                                                                                                                                                        |
| `placeholderValue` | No       | `string`  |                  | The content to appear in the form control when the form control is empty.                                                                                                                                                                                                                  |
| `searchUrl`        | No       | `string`  |                  | The URL that will recieve the value of the autocomplete element. The value will be sent on user input (debounced by 750 ms) as the query string property `value`. This URL should return the relevant options in our standard options format (see [Options Element](./options-element.md)) |

Autocomplete element also inherits the properties of the following:

- [Base Element](./base-element.md)
- [Options Element](./options-element.md)
- [Lookup Element](./lookup-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "autocomplete",
  "name": "Address",
  "label": "Address",
  "defaultValue": "954af543-f500-4476-9403-f2ebc6c2260e",
  "required": true,
  "readOnly": false,
  "options": [
    {
      "id": "954af543-f500-4476-9403-f2ebc6c2260e",
      "value": "124 Blink St, Gosford NSW, 2250",
      "label": "124 Blink St, Gosford NSW, 2250"
    },
    {
      "id": "51a282e8-4134-4d69-a18a-10440d5f4e12",
      "value": "126 Blink St, Gosford NSW, 2250",
      "label": "126 Blink St, Gosford NSW, 2250"
    },
    {
      "id": "cf61d95f-658c-409f-b57e-d9c74d0fb9d1",
      "value": "128 Blink St, Gosford NSW, 2250",
      "label": "128 Blink St, Gosford NSW, 2250"

    }
  ]
}
```
