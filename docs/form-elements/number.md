# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Number Element

Allow the user to enter a numeric value (not to be confused with a [Phone Number](./telephone.md)).

| Property          | Required                | Type      | Default    | Description                                                                              |
| ----------------- | ----------------------- | --------- | ---------- | ---------------------------------------------------------------------------------------- |
| `type`            | Yes                     | `string`  | `'number'` | The type of Form Element.                                                                |
| `name`            | Yes                     | `string`  |            | The key that will be assigned a value in the submission data when the form is submitted. |
| `label`           | Yes                     | `string`  |            | Display text presented to the user above the input by default.                           |
| `defaultValue`    | No                      | `number`  |            | A default value when the form is opened.                                                 |
| `required`        | Yes                     | `boolean` | `false`    | Determine if this input requires a value entered by the user (`true`) or not (`false`).  |
| `readOnly`        | Yes                     | `boolean` | `false`    | Determine if this input can be edited by the user (`false`) or not (`true`).             |
| `isSlider`        | Yes                     | `boolean` | `false`    | Determine if this input is represented as a slider (`true`) or not (`false`).            |
| `minNumber`       | If `isSlider` is `true` | `number`  |            | The smallest possible number that can be entered by the user.                            |
| `maxNumber`       | If `isSlider` is `true` | `number`  |            | The largest possible number that can be entered by the user.                             |
| `sliderIncrement` | No                      | `number`  | `1`        | The increment between the each move of the slider.                                       |

Number element also inherits the properties of the following:

-   [Base Element](./base-element.md)
-   [Lookup Element](./lookup-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "number",
  "name": "total",
  "label": "How many were there?",
  "defaultValue": 10,
  "required": true,
  "readOnly": false,
  "isSlider": true,
  "minNumber": 0,
  "maxNumber": 100,
  "sliderIncrement": 5
}
```
