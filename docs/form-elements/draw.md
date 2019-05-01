# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Draw (Signature) Element

Allow the user to draw a sketch (usually used to submit signatures).

| Property   | Required | Type      | Default  | Description                                                                              |
| ---------- | -------- | --------- | -------- | ---------------------------------------------------------------------------------------- |
| `type`     | Yes      | `string`  | `'draw'` | The type of Form Element.                                                                |
| `name`     | Yes      | `string`  |          | The key that will be assigned a value in the submission data when the form is submitted. |
| `label`    | Yes      | `string`  |          | Display text presented to the user above the input by default.                           |
| `required` | Yes      | `boolean` | `false`  | Determine if this input requires a value drawn by the user (`true`) or not (`false`).    |

Draw element also inherits the properties of the following:

-   [Base Element](./base-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "draw",
  "name": "signature",
  "label": "Sign Here",
  "required": true
}
```
