# OneBlink SDK | FormsAppStylesButtons Definitions

[Back to FormsAppStyles](./FormsAppStyles.md)

## FormsAppStylesButtons

| Property          | Required | Type                                          | Description                                                  |
| ----------------- | -------- | --------------------------------------------- | ------------------------------------------------------------ |
| `submit`          | No       | [`ButtonConfiguration`](#buttonconfiguration) | Button configuration for the Submit button                   |
| `cancel`          | No       | [`ButtonConfiguration`](#buttonconfiguration) | Button configuration for the Cancel button                   |
| `saveDraft`       | No       | [`ButtonConfiguration`](#buttonconfiguration) | Button configuration for the Save Draft button               |
| `cancelPromptYes` | No       | [`ButtonConfiguration`](#buttonconfiguration) | Button configuration for the Cancel Prompt dialog Yes button |
| `cancelPromptNo`  | No       | [`ButtonConfiguration`](#buttonconfiguration) | Button configuration for the Cancel Prompt dialog No button  |

## ButtonConfiguration

| Property | Required | Type     | Description                                                                                                              |
| -------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `label`  | No       | `string` | The text to display on the button.                                                                                       |
| `icon`   | No       | `string` | The icon to display on the button. Must be a valid Material Icon code as it appears here: https://fonts.google.com/icons |

## Example

```JSON
{
  "submit": {
    "label": "Send",
    "icon": "send"
  },
  "saveDraft": {
    "label": "Save for Later",
  },
  "cancelPromptYes": {
    "icon": "delete"
  }
}
```
