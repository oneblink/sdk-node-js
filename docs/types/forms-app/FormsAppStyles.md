# OneBlink SDK | FormsAppStyles Definition

[Back to FormsApp](./README.md)

## FormsAppStyles

For Forms Apps of type `TILES` [ContainerMenuItem](./FormsAppStylesMenuItems.md#containermenuitem), [FormMenuItem](./FormsAppStylesMenuItems.md#formmenuitem) and [HrefMenuItem](./FormsAppStylesMenuItems.md#hrefmenuitem) can be used in the `menuItems` array, as well as [ScreenMenuItem](./FormsAppStylesMenuItems.md#screenmenuitem) exluding the `FORMS_LIST` type.

Form Forms Apps of type `FORMS_LIST` only [ScreenMenuItem](./FormsAppStylesMenuItems.md#screenmenuitem) and [HrefMenuItem](./FormsAppStylesMenuItems.md#hrefmenuitem) can be used in the `menuItems` array.

| Property           | Required | Type                                                       | Description                                                                                     |
| ------------------ | -------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `foregroundColour` | No       | `string`                                                   | Foreground colour of banner in Forms App                                                        |
| `highlightColour`  | No       | `string`                                                   | Highlight colour for elements that should stand out                                             |
| `contrastColour`   | No       | `string`                                                   | Contrast colour applied against the highlight colour                                            |
| `customCss`        | No       | `string`                                                   | Custom CSS applied to the Forms App                                                             |
| `logoUrl`          | No       | `string`                                                   | The absolute URL to the logo image in the Forms App                                             |
| `menuItems`        | Yes      | [`FormsAppStylesMenuItem[]`](./FormsAppStylesMenuItems.md) | Array of menu item objects. See above for which menu items to use for different forms app types |
| `buttons`          | No       | [`FormsAppStylesButtons`](./FormsAppStylesButtons.md)      | Configuration object for button customization                                                   |

## VolunteerFormsAppStyles

| Property           | Required | Type     | Description                                          |
| ------------------ | -------- | -------- | ---------------------------------------------------- |
| `foregroundColour` | No       | `string` | Foreground colour of banner in Forms App             |
| `highlightColour`  | No       | `string` | Highlight colour for elements that should stand out  |
| `contrastColour`   | No       | `string` | Contrast colour applied against the highlight colour |
| `customCss`        | No       | `string` | Custom CSS applied to the Forms App                  |
| `logoUrl`          | No       | `string` | The absolute URL to the logo image in the Forms App  |

## Examples

### Forms List Apps

```JSON
{
  "foregroundColour": "#454545",
  "highlightColour": "#676767",
  "contrastColour": "#FFFFFF",
  "customCss": ".ob-form { background-color: red; }",
  "logoUrl": "https://my-website.com/logo.png",
  "menuItems": [
    {
      "label": "Profile",
      "icon": "person",
      "type": "PROFILE",
      "isHidden": false,
      "isDefault": true
    },
    {
      "label": "Google",
      "icon": "search",
      "type": "HREF",
      "href": "https://google.com"
    }
  ]
}
```

### Container Apps

```JSON
{
  "foregroundColour": "#454545",
  "highlightColour": "#676767",
  "contrastColour": "#FFFFFF",
  "customCss": ".ob-form { background-color: red; }",
  "logoUrl": "https://my-website.com/logo.png",
  "menuItems": [
    {
      "label": "Forms",
      "icon": "dashboard",
      "type": "CONTAINER",
      "formIds": [1, 2, 3]
    },
    {
      "label": "Compliance Check",
      "icon": "search",
      "type": "FORM",
      "formId": 2
    },
    {
      "label": "Google",
      "icon": "search",
      "type": "HREF",
      "href": "https://google.com"
    },
  ]
}
```

### Volunteer Apps

```JSON
{
  "foregroundColour": "#454545",
  "highlightColour": "#676767",
  "contrastColour": "#FFFFFF",
  "customCss": ".ob-form { background-color: red; }",
  "logoUrl": "https://my-website.com/logo.png",
}
```
