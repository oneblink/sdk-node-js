# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Calculation Element

Calculate a value to display to the user. See [Calculation Documentation](https://support.oneblink.io/support/solutions/articles/42000050882-calculation) for more details.

| Property                | Required | Type      | Default         | Description                                                                                                    |
| ----------------------- | -------- | --------- | --------------- | -------------------------------------------------------------------------------------------------------------- |
| `type`                  | Yes      | `string`  | `'calculation'` | The type of Form Element.                                                                                      |
| `name`                  | Yes      | `string`  |                 | The key that will be assigned a value in the submission data when the form is submitted.                       |
| `label`                 | Yes      | `string`  |                 | Friendly text to identify the element.                                                                         |
| `calculation`           | Yes      | `string`  |                 | The calculation formula.                                                                                       |
| `defaultValue`          | Yes      | `string`  | `'{RESULT}'`    | The HTML to display the result of the calculation. Must contain the string `'{RESULT}'` to display the result. |
| `preCalculationDisplay` | No       | `string`  |                 | The HTML to display before the result has been calculated.                                                     |
| `displayAsCurrency`     | No       | `boolean` |                 | Determine if the result should be displayed in the local currency format (`true`) or not (`false`).            |

Calculation element also inherits the properties of the following:

- [Base Element](./base-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "calculation",
  "name": "bmi",
  "label": "Body Mass Index",
  "calculation": "{ELEMENT:weight} / ({ELEMENT:height} / 100) * ({ELEMENT:height} / 100)",
  "defaultValue": "<p>Your Body Mass Index is: <b>{RESULT}</b></p>",
  "preCalculationDisplay": "<p>Please enter your weight and height to calculate your BMI.</p>",
  "displayAsCurrency": false
}
```
