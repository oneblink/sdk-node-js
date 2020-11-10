# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Camera Element

Allow the user to take a photo using native camera functionality (or select an existing image) if the device is supported.

| Property                    | Required | Type      | Default    | Description                                                                                 |
| --------------------------- | -------- | --------- | ---------- | ------------------------------------------------------------------------------------------- |
| `type`                      | Yes      | `string`  | `'camera'` | The type of Form Element.                                                                   |
| `name`                      | Yes      | `string`  |            | The key that will be assigned a value in the submission data when the form is submitted.    |
| `label`                     | Yes      | `string`  |            | Display text presented to the user above the input by default.                              |
| `required`                  | Yes      | `boolean` | `false`    | Determine if this input requires a value entered by the user (`true`) or not (`false`).     |
| `includeTimestampWatermark` | no       | `boolean` | `false`    | Whether a watermark with a timestamp should be placed on images captured with this element. |

Camera element also inherits the properties of the following:

- [Base Element](./base-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "camera",
  "name": "photo",
  "label": "Please Take a Photo",
  "required": true
}
```
