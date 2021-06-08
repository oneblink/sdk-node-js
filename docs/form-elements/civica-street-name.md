# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Civica Street Name Element

Allows the user to search for and select a single Civica Street Name record.

| Property           | Required | Type      | Default              | Description                                                                                 |
| ------------------ | -------- | --------- | -------------------- | ------------------------------------------------------------------------------------------- |
| `type`             | Yes      | `string`  | `'civicaStreetName'` | The type of Form Element Element.                                                           |
| `name`             | Yes      | `string`  |                      | The key that will be assigned a value in the submission data when the form is submitted.    |
| `label`            | Yes      | `string`  |                      | Display text presented to the user above the input by default.                              |
| `hint`             | No       | `string`  |                      | A hint triggered by an icon tooltip to be displayed when hovering beside the element label. |
| `required`         | Yes      | `boolean` | `false`              | Determine if this element requires an option to be selected (`true`) or not (`false`).      |
| `readOnly`         | Yes      | `boolean` | `false`              | Determine if this selected option be changed by the user (`false`) or not (`true`).         |
| `defaultValue`     | No       | `object`  |                      | The result of a request to Civica `/api/v2/streetregister/streetnames`                      |
| `placeholderValue` | No       | `string`  |                      | The content to appear in the form control when the form control is empty.                   |

This element also inherits the properties of the following:

- [Base Element](./base-element.md)
- [Lookup Element](./lookup-element.md)

### Example

```json
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "civicaStreetName",
  "name": "streetName",
  "label": "Street Name",
  "required": true,
  "readOnly": false,
  "placeholderValue": "Starting typing to search for your street",
  "defaultValue": {
    "streetId": 123,
    "blockId": 0,
    "name": "Fake",
    "typeCode": "RD",
    "typeDescription": "Road",
    "suburbId": 321,
    "suburbName": "FAKEVILLE",
    "postCode": "2444",
    "localityName": null,
    "postTown": null,
    "formattedAccount": "00004321.0000",
    "suburbState": "NSW",
    "formattedStreet": "Fake Road FAKEVILLE"
  }
}
```

### Example Submission Data

```json
{
  "submission": {
    "[element.name]": {
      "streetId": 123,
      "blockId": 0,
      "name": "Fake",
      "typeCode": "RD",
      "typeDescription": "Road",
      "suburbId": 321,
      "suburbName": "FAKEVILLE",
      "postCode": "2444",
      "localityName": null,
      "postTown": null,
      "formattedAccount": "00004321.0000",
      "suburbState": "NSW",
      "formattedStreet": "Fake Road FAKEVILLE"
    }
  }
}
```
