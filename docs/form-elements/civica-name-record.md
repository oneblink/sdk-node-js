# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Civica Name Record Element

Allows the user to enter the required data for Civica Name Record.

| Property                  | Required | Type      | Default              | Description                                                                              |
| ------------------------- | -------- | --------- | -------------------- | ---------------------------------------------------------------------------------------- |
| `type`                    | Yes      | `string`  | `'civicaNameRecord'` | The type of Form Element Element.                                                        |
| `name`                    | Yes      | `string`  |                      | The key that will be assigned a value in the submission data when the form is submitted. |
| `label`                   | Yes      | `string`  |                      | Friendly text to identify the element.                                                   |
| `required`                | Yes      | `boolean` | `false`              | Determine if this Name Record is required (`true`) or not (`false`).                     |
| `readOnly`                | Yes      | `boolean` | `false`              | Determine if this elements can be changed by the user (`false`) or not (`true`).         |
| `defaultValue`            | No       | `object`  |                      | The `requestor.nameDetails` value of a request to Civica `/api/v2/crm/crm`               |
| `giveName1Label`          | No       | `string`  |                      | The label that will be set for this field when the element is rendered.                  |
| `giveName1IsRequired`     | No       | `boolean` | `false`              | Whether this field is required to be filled in when the element is rendered.             |
| `giveName1IsHidden`       | No       | `boolean` | `false`              | Whether this field is hidden when the element is rendered.                               |
| `emailAddressLabel`       | No       | `string`  |                      | The label that will be set for this field when the element is rendered.                  |
| `emailAddressIsRequired`  | No       | `boolean` | `false`              | Whether this field is required to be filled in when the element is rendered.             |
| `emailAddressIsHidden`    | No       | `boolean` | `false`              | Whether this field is hidden when the element is rendered.                               |
| `homePhoneLabel`          | No       | `string`  |                      | The label that will be set for this field when the element is rendered.                  |
| `homePhoneIsRequired`     | No       | `boolean` | `false`              | Whether this field is required to be filled in when the element is rendered.             |
| `homePhoneIsHidden`       | No       | `boolean` | `false`              | Whether this field is hidden when the element is rendered.                               |
| `businessPhoneLabel`      | No       | `string`  |                      | The label that will be set for this field when the element is rendered.                  |
| `businessPhoneIsRequired` | No       | `boolean` | `false`              | Whether this field is required to be filled in when the element is rendered.             |
| `businessPhoneIsHidden`   | No       | `boolean` | `false`              | Whether this field is hidden when the element is rendered.                               |
| `mobilePhoneLabel`        | No       | `string`  |                      | The label that will be set for this field when the element is rendered.                  |
| `mobilePhoneIsRequired`   | No       | `boolean` | `false`              | Whether this field is required to be filled in when the element is rendered.             |
| `mobilePhoneIsHidden`     | No       | `boolean` | `false`              | Whether this field is hidden when the element is rendered.                               |
| `faxPhoneLabel`           | No       | `string`  |                      | The label that will be set for this field when the element is rendered.                  |
| `faxPhoneIsRequired`      | No       | `boolean` | `false`              | Whether this field is required to be filled in when the element is rendered.             |
| `faxPhoneIsHidden`        | No       | `boolean` | `false`              | Whether this field is hidden when the element is rendered.                               |
| `streetAddressesLabel`    | No       | `string`  |                      | The label that will be set for this field when the element is rendered.                  |
| `address1Label`           | No       | `string`  |                      | The label that will be set for this field when the element is rendered.                  |
| `address2Label`           | No       | `string`  |                      | The label that will be set for this field when the element is rendered.                  |
| `postcodeLabel`           | No       | `string`  |                      | The label that will be set for this field when the element is rendered.                  |

This element also inherits the properties of the following:

- [Base Element](./base-element.md)

### Example

```json
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "civicaNameRecord",
  "name": "streetName",
  "label": "Street Name",
  "required": true,
  "readOnly": false,
  "defaultValue": {
    "title": "MR",
    "givenName1": "John",
    "familyName": "Smith",
    "emailAddress": "john.smith@exmaple.com",
    "homePhone": "12",
    "businessPhone": "34",
    "mobilePhone": "56",
    "faxPhone": "78",
    "streetAddress": [
      {
        "address1": "1 High St",
        "address2": "Sydney",
        "postcode": "2000"
      }
    ]
  }
}
```

### Example Submission Data

```json
{
  "submission": {
    "[element.name]": {
      "title": "MR",
      "givenName1": "John",
      "familyName": "Smith",
      "emailAddress": "john.smith@exmaple.com",
      "homePhone": "12",
      "businessPhone": "34",
      "mobilePhone": "56",
      "faxPhone": "78",
      "streetAddress": [
        {
          "address1": "1 High St",
          "address2": "Sydney",
          "postcode": "2000"
        }
      ]
    }
  }
}
```
