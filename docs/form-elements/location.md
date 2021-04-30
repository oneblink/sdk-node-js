# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## Location Element

Allow the user to select GPS coordinates on an interactive map.

| Property | Required | Type     | Default      | Description                                                                                                  |
| -------- | -------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------ |
| `type`   | Yes      | `string` | `'location'` | The type of Form Element.                                                                                    |
| `name`   | Yes      | `string` |              | The key that will be assigned a value in the format below in the submission data when the form is submitted. |
| `label`  | Yes      | `string` |              | Display text presented to the user above the map by default.                                                 |
| `hint`   | No       | `string` |              | A hint triggered by an icon tooltip to be displayed when hovering beside the element label.                  |

Location element also inherits the properties of the following:

- [Base Element](./base-element.md)
- [Lookup Element](./lookup-element.md)

### Example

```json
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "location",
  "name": "gpsCoordinates",
  "label": "Where did it happen?"
}
```

### Example Submission Data

```json
{
  "submission": {
    "[element.name]": {
      "latitude": -33.426765,
      "longitude": 151.34375,
      "zoom": 15
    }
  }
}
```
