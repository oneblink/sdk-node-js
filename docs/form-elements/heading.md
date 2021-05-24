# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Heading Element

Display a heading to the user.

| Property      | Required | Type                    | Default     | Description                                                                                                                              |
| ------------- | -------- | ----------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `type`        | Yes      | `string`                | `'heading'` | The type of Form Element.                                                                                                                |
| `name`        | Yes      | `string`                |             | The key that will be assigned a value `true` (if the element is shown) or `false` (if the element is hidden) when the form is submitted. |
| `label`       | Yes      | `string`                |             | The text to display.                                                                                                                     |
| `headingType` | Yes      | `1 \| 2 \| 3 \| 4 \| 5` |             | The size of the heading. `1` being the largest and `5` being the smallest.                                                               |

Heading element also inherits the properties of the following:

- [Base Element](./base-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "heading",
  "name": "inspectionForm",
  "label": "Inspection Form",
  "headingType": 1
}
```
