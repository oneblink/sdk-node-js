# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Point Address Element

Allows the user to search for Point addresses and select a single address.

| Property               | Required | Type       | Default          | Description                                                                                                                                      |
| ---------------------- | -------- | ---------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`                 | Yes      | `string`   | `'pointAddress'` | The type of Form Element.                                                                                                                        |
| `name`                 | Yes      | `string`   |                  | The key that will be assigned a value in the submission data when the form is submitted.                                                         |
| `label`                | Yes      | `string`   |                  | Display text presented to the user above the input by default.                                                                                   |
| `hint`                 | No       | `string`   |                  | A hint triggered by an icon tooltip to be displayed when hovering beside the element label.                                                      |
| `required`             | Yes      | `boolean`  | `false`          | Determine if this element requires an option to be selected (`true`) or not (`false`).                                                           |
| `readOnly`             | Yes      | `boolean`  | `false`          | Determine if this selected option be changed by the user (`false`) or not (`true`).                                                              |
| `defaultValue`         | No       | `object`   |                  | The result of a [Point Address Predictive request](https://point.digital.nsw.gov.au/v2/docs/pages/support.html#/default/post_v2_api_predictive2) |
| `placeholderValue`     | No       | `string`   |                  | The content to appear in the form control when the form control is empty.                                                                        |
| `stateTerritoryFilter` | No       | `string[]` |                  | An array of Australian State and/or Territory abbreviations that the search should be limited to.                                                |
| `addressTypeFilter`    | No       | `string[]` |                  | An array of address types that the search should be limited to.                                                                                  |

This element also inherits the properties of the following:

- [Base Element](./base-element.md)
- [Lookup Element](./lookup-element.md)

### Example

```json
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "pointAddress",
  "name": "Address",
  "label": "Address",
  "required": true,
  "readOnly": false,
  "placeholderValue": "Starting typing to search for your address",
  "stateTerritoryFilter": ["NSW", "VIC", "WA", "NT", "TAS", "ACT", "SA", "QLD"],
  "defaultValue": {
    "dataset": "gnaf,mailAddress,gnaflive",
    "geo": {
      "geoDatumCode": "GDA94",
      "geoFeature": "FRONTAGE CENTRE SETBACK",
      "geometry": {
        "coordinates": [143.87309935, -37.53831866],
        "type": "Point"
      }
    },
    "addressDetails": {
      "cadastralIdentifier": "1/PS528961~////",
      "formattedAddress": "219 NORMAN ST, BALLARAT NORTH VIC 3350",
      "localityName": "BALLARAT NORTH",
      "postcode": "3350",
      "stateTerritory": "VIC",
      "streetName": "NORMAN",
      "streetNumber1": "219",
      "streetType": "ST"
    },
    "addressId": "GAVIC423834288",
    "addressRecordType": "Primary",
    "asgsMain": {
      "2011": {
        "mbId": "20010870000",
        "sa1Id": "20101100317",
        "sa2Id": "201011003",
        "sa2Name": "BALLARAT - NORTH",
        "sa3Id": "20101",
        "sa3Name": "BALLARAT",
        "sa4Id": "201",
        "sa4Name": "BALLARAT"
      },
      "2016": {
        "mbId": "20010870000",
        "sa1Id": "20101100317",
        "sa2Id": "201011003",
        "sa2Name": "BALLARAT - NORTH",
        "sa3Id": "20101",
        "sa3Name": "BALLARAT",
        "sa4Id": "201",
        "sa4Name": "BALLARAT"
      }
    },
    "commonwealthElectorate": {
      "commElectoralName": "BALLARAT",
      "commElectoralPid": "VIC25"
    },
    "localGovernmentArea": {
      "lgaName": "BALLARAT CITY",
      "lgaPid": "VIC241",
      "lgaShortName": "BLT CTY"
    },
    "stateElectorate": [
      {
        "stateElectoralName": "WENDOUREE",
        "stateElectoralType": "Legislative Assembly"
      }
    ],
    "cadastralParcels": [
      {
        "propId": "3953275",
        "parcelId": ["277//DP821883", "279//DP823425"]
      }
    ]
  }
}
```
