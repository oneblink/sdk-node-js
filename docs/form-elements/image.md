# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Image Element

Display an image to the user.

| Property       | Required | Type     | Default   | Description                                                                                                                              |
| -------------- | -------- | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `type`         | Yes      | `string` | `'image'` | The type of Form Element.                                                                                                                |
| `name`         | Yes      | `string` |           | The key that will be assigned a value `true` (if the element is shown) or `false` (if the element is hidden) when the form is submitted. |
| `label`        | Yes      | `string` |           | Friendly text to identify the element.                                                                                                   |
| `defaultValue` | Yes      | `string` |           | The absolute URL to the image.                                                                                                           |

Image element also inherits the properties of the following:

- [Base Element](./base-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "image",
  "name": "pieChart",
  "label": "pieChart",
  "defaultValue": "https://en.wikipedia.org/wiki/Pie_chart#/media/File:Pie_chart_EP_election_2004_exploded.png"
}
```
