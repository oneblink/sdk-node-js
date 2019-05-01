# OneBlink SDK | Form Element Definitions

[Back to all Elements](../README.md)

## Autocomplete Element

Returns a list containing a value/values to the user, predicted based off of the user's input.

| Property       | Required | Type      | Default          | Description                                                                                        |
| -------------- | -------- | --------- | ---------------- | -------------------------------------------------------------------------------------------------- |
| `type`         | Yes      | `string`  | `'autocomplete'` | The type of Form Element. |
| `name`         | Yes      | `string`  |                  | The key that will be assigned a value in the submission data when the form is submitted. |
| `label`        | Yes      | `string`  |                  | Display text to identify the element. |
| `defaultValue` | Yes      | `string`  |                  | The default text to display. |
| `readOnly`     | Yes      | `Boolean` | `false`          | Whether the element's input is editable within the form. |

Autocomplete element also inherits the properties of the following:

-   [Base Element](./base-element.md)
-   [Options Element](./options-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "autocomplete",
  "name": "Address",
  "label": "Address",
  "defaultValue": "123 Blink St, Gosford NSW, 2250",
  "options": [
    {
      "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
      "value": "124 Blink St, Gosford NSW, 2250",
      "label": "124 Blink St, Gosford NSW, 2250",
      "attributes": [
        {
          "optionIds": [
            "b1311ae0-6bb7-11e9-a923-1681be663d3e",
            "b1311ae0-6bb7-11e9-a923-1681be663d3e",
            "b1311ae0-6bb7-11e9-a923-1681be663d3e"
          ],
          "elementId": "b1311ae0-6bb7-11e9-a923-1681be663d3e"
        }
      ]
    }
  ]
}
```
