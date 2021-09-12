# OneBlink SDK | FormsAppStylesMenuItems Definitions

[Back to FormsAppStyles](./FormsAppStyles.md)

## ScreenMenuItem

| Property    | Required | Type      | Description                                                                                    |
| ----------- | -------- | --------- | ---------------------------------------------------------------------------------------------- |
| `label`     | Yes      | `string`  | Label for the menu item                                                                        |
| `icon`      | Yes      | `string`  | Icon to be used for the menu item                                                              |
| `type`      | Yes      | `string`  | Type of menu item, valid values "FORMS_LIST", "JOBS", "DRAFTS","PENDING_SUBMISSIONS","PROFILE" |
| `isHidden`  | Yes      | `boolean` | If true, menu item will be hidden                                                              |
| `isDefault` | Yes      | `boolean` | If true, menu item will be the default item shown                                              |

## HrefMenuItem

| Property | Required | Type     | Description                       |
| -------- | -------- | -------- | --------------------------------- |
| `label`  | Yes      | `string` | Label for the menu item           |
| `icon`   | Yes      | `string` | Icon to be used for the menu item |
| `type`   | Yes      | `string` | value must be "HREF"              |
| `href`   | Yes      | `string` | Url to be opened for menu item    |

## ContainerMenuItem

| Property  | Required | Type       | Description                               |
| --------- | -------- | ---------- | ----------------------------------------- |
| `label`   | Yes      | `string`   | Label for the menu item                   |
| `icon`    | Yes      | `string`   | Icon to be used for the menu item         |
| `type`    | Yes      | `string`   | value must be "CONTAINER"                 |
| `formIds` | Yes      | `number[]` | The ids of the forms within the container |

## FormMenuItem

| Property | Required | Type     | Description                       |
| -------- | -------- | -------- | --------------------------------- |
| `label`  | Yes      | `string` | Label for the menu item           |
| `icon`   | Yes      | `string` | Icon to be used for the menu item |
| `type`   | Yes      | `string` | value must be "FORM"              |
| `formId` | Yes      | number   | The id of the form                |

## Examples

### ScreenMenuItem

```JSON
{
  "label": "Profile",
  "icon": "person",
  "type": "PROFILE",
  "isHidden": false,
  "isDefault": true
}
```

### HrefMenuItem

```JSON
{
  "label": "Google",
  "icon": "search",
  "type": "HREF",
  "href": "https://google.com"
}
```

### ContainerMenuItem

```JSON
{
  "label": "Forms",
  "icon": "dashboard",
  "type": "CONTAINER",
  "formIds": [1, 2, 3]
}
```

### FormMenuItem

```JSON
{
  "label": "Compliance Check",
  "icon": "search",
  "type": "FORM",
  "formId": 2
}
```
