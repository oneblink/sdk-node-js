# OneBlink SDK | FormsAppPWASettings Definition

[Back to FormsApp](./README.md)

## FormsAppPwaSettings

| Property            | Required | Type     | Description                                                                                                  |
| ------------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `homeScreenName`    | No       | `string` | The text beneath the app icon when installed as a progressive web app on mobile devices                      |
| `splashScreenName`  | No       | `string` | The text on the splash screen when installed as a progressive web app on mobile devices                      |
| `homeScreenIconUrl` | No       | `string` | The absolute URL to the app icon that is displayed when installed as a progressive web app on mobile devices |

### Example

```JSON
{
  "homeScreenName": "My Home Screen",
  "splashScreenName": "My Splash Screen",
  "homeScreenIconUrl": "https://my-website.com/icon.png"
}
```
