# OneBlink SDK | FormsApps Class

## Functions

-   [`createFormsApp()`](#createFormsApp())
-   [`deleteFormsApp()`](#deleteFormsApp())
-   [`getFormsApp()`](#getFormsApp())
-   [`updateFormsApp()`](#updateFormsApp())
-   [`updateStyles()`](#updateStyles())

## Constructor

| Parameter           | Required | Type     | Description                      |
| ------------------- | -------- | -------- | -------------------------------- |
| `options.accessKey` | Yes      | `string` | Access key provided by OneBlink. |
| `options.secretKey` | Yes      | `string` | Secret key provided by OneBlink. |

### Example

```javascript
const OneBlink = require('@oneblink/sdk')

const options = {
  accessKey: '123455678901ABCDEFGHIJKL',
  secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL'
}
const formsAppsSDK = new OneBlink.FormsApps(options)
```

## `createFormsApp()`

Create a Forms App

### Example

```javascript
const formsApp = {
  'name': 'My Application',
  'hostname': 'customer-my.app.oneblink.io',
  'pwaSettings': {
    'homeScreenName': 'App',
    'splashScreenName': 'Application'
  },
  'organisationId': 'ABCDEFGHIJKL123456789012',
  'formIds': []
}
formsAppsSDK.createFormsApp(formsApp)
  .then((savedFormsApp) => {
    // Use Forms App here...
  })
```

### Parameters

| Parameter                                | Required | Type       | Description                                                                                                                  |
| ---------------------------------------- | -------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `formsApp`                               | Yes      | `Object`   | Forms App properties                                                                                                         |
| `formsApp.name`                          | Yes      | `string`   | Name of the forms app                                                                                                        |
| `formsApp.hostname`                      | Yes      | `string`   | Hostname (domain) for the forms app                                                                                          |
| `formsApp.organisationId`                | Yes      | `string`   | The exact organisation identifier the forms app is associated with                                                           |
| `formsApp.formIds`                       | Yes      | `number[]` | The identifiers of the forms that are in the forms app. The order of the forms is respected when rendering the list of forms |
| `formsApp.pwaSettings`                   | Yes      | `Object`   | Forms App progressive web app setting properties                                                                             |
| `formsApp.pwaSettings.homeScreenName`    | No       | `string`   | The text beneath the app icon when installed as a progressive web app on mobile devices                                      |
| `formsApp.pwaSettings.splashScreenName`  | No       | `string`   | The text on the splash screen when installed as a progressive web app on mobile devices                                      |
| `formsApp.pwaSettings.homeScreenIconUrl` | No       | `string`   | The absolute URL to the app icon that is displayed when installed as a progressive web app on mobile devices                 |
| `formsApp.welcomeEmail`                  | No       | `Object`   | Forms App custom welcome email properties                                                                                    |
| `formsApp.welcomeEmail.subject`          | No       | `string`   | The subject to use when sending welcome emails to new app users                                                              |
| `formsApp.welcomeEmail.body`             | No       | `string`   | The HTML to use when sending welcome emails to new app users                                                                 |

### Result (Resolved Promise)

```json
{
  "id": 1,
  "name": "My Application",
  "hostname": "customer-my.app.oneblink.io",
  "oAuthClientId": "123456789012abcdefghijkl",
  "styles": {},
  "pwaSettings": {
    "homeScreenName": "App",
    "splashScreenName": "Application"
  },
  "createdAt": "2018-06-01T00:00:00.000Z",
  "updatedAt": "2019-05-17T05:49:14.000Z",
  "organisationId": "ABCDEFGHIJKL123456789012",
  "formIds": []
}
```

## `deleteFormsApp()`

Delete a Forms App by its identifier

### Example

```javascript
const formsAppId = 1
formsAppsSDK.deleteFormsApp(formsAppId)
  .then(() => {
    // Forms App has been deleted...
  })
```

### Parameters

| Parameter   | Required | Type     | Description                                              |
| ----------- | -------- | -------- | -------------------------------------------------------- |
| `formAppId` | Yes      | `number` | The exact identifier of the Forms App you wish to delete |

### Result (Resolved Promise)

```js
undefined
```

## `getFormsApp()`

Get a single Forms App by its identifier

### Example

```javascript
const formsAppId = 1
formsAppsSDK.getFormsApp(formsAppId)
  .then((formsApp) => {
    // Use Forms App here...
  })
```

### Parameters

| Parameter   | Required | Type     | Description                                           |
| ----------- | -------- | -------- | ----------------------------------------------------- |
| `formAppId` | Yes      | `number` | The exact identifier of the Forms App you wish to get |

### Result (Resolved Promise)

```json
{
  "id": 1,
  "name": "My Application",
  "hostname": "customer-my.app.oneblink.io",
  "oAuthClientId": "ABCDEFGHIJKL123456789012",
  "styles": {
    "logoUrl": "",
    "customCss": "",
    "contrastColour": "#fff",
    "highlightColour": "#0693e3",
    "foregroundColour": "#abb8c3"
  },
  "pwaSettings": {
    "homeScreenName": "App",
    "splashScreenName": "Application",
    "homeScreenIconUrl": ""
  },
  "createdAt": "2018-06-01T00:00:00.000Z",
  "updatedAt": "2019-05-17T05:49:14.000Z",
  "organisationId": "ABCDEFGHIJKL123456789012",
  "formIds": []
}
```

## `updateFormsApp()`

Update a Forms App

### Example

```javascript
const formsApp = {
  'id': 1,
  'name': 'My Application',
  'hostname': 'customer-my.app.oneblink.io',
  'oAuthClientId': '123456789012abcdefghijkl',
  'pwaSettings': {
    'homeScreenName': 'App',
    'splashScreenName': 'Application'
  },
  'createdAt': '2018-06-01T00:00:00.000Z',
  'updatedAt': '2019-05-17T05:49:14.000Z',
  'organisationId': 'ABCDEFGHIJKL123456789012',
  'formIds': []
}
formsAppsSDK.updateFormsApp(formsApp)
  .then((savedFormsApp) => {
    // Use Forms App here...
  })
```

### Parameters

| Parameter                                | Required | Type       | Description                                                                                                                  |
| ---------------------------------------- | -------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `formsApp`                               | Yes      | `Object`   | Forms App properties                                                                                                         |
| `formsApp.id`                            | Yes      | `number`   | Identifier of the forms app                                                                                                  |
| `formsApp.name`                          | Yes      | `string`   | Name of the forms app                                                                                                        |
| `formsApp.hostname`                      | Yes      | `string`   | Hostname (domain) for the forms app                                                                                          |
| `formsApp.organisationId`                | Yes      | `string`   | The exact organisation identifier the forms app is associated with                                                           |
| `formsApp.oAuthClientId`                 | Yes      | `string`   | The identifier of the OAuth Client for the forms app **(Do not change this)**.                                               |
| `formsApp.formIds`                       | Yes      | `number[]` | The identifiers of the forms that are in the forms app. The order of the forms is respected when rendering the list of forms |
| `formsApp.pwaSettings`                   | Yes      | `Object`   | Forms App progressive web app setting properties                                                                             |
| `formsApp.pwaSettings.homeScreenName`    | No       | `string`   | The text beneath the app icon when installed as a progressive web app on mobile devices                                      |
| `formsApp.pwaSettings.splashScreenName`  | No       | `string`   | The text on the splash screen when installed as a progressive web app on mobile devices                                      |
| `formsApp.pwaSettings.homeScreenIconUrl` | No       | `string`   | The absolute URL to the app icon that is displayed when installed as a progressive web app on mobile devices                 |
| `formsApp.welcomeEmail`                  | No       | `Object`   | Forms App custom welcome email properties                                                                                    |
| `formsApp.welcomeEmail.subject`          | No       | `string`   | The subject to use when sending welcome emails to new app users                                                              |
| `formsApp.welcomeEmail.body`             | No       | `string`   | The HTML to use when sending welcome emails to new app users                                                                 |

### Result (Resolved Promise)

```json
{
  "id": 1,
  "name": "My Application",
  "hostname": "customer-my.app.oneblink.io",
  "oAuthClientId": "123456789012abcdefghijkl",
  "styles": {},
  "pwaSettings": {
    "homeScreenName": "App",
    "splashScreenName": "Application"
  },
  "createdAt": "2018-06-01T00:00:00.000Z",
  "updatedAt": "2019-05-17T05:49:14.000Z",
  "organisationId": "ABCDEFGHIJKL123456789012",
  "formIds": []
}
```

## `updateStyles()`

Update a Forms App

### Example

```javascript
const formsAppId = 1
const styles = {
  'foregroundColour': '#E8E8E8',
  'highlightColour': '#0000FF',
  'contrastColour': '#FFFFFF',
  'customCss': '.ob-button { border-radius: 10px; }',
  'logoUrl': 'http://logo.com/path/to/image.png'
}
formsAppsSDK.updateStyles(formsAppId, styles)
  .then(() => {
    // Styles have been updated...
  })
```

### Parameters

| Parameter                   | Required | Type     | Description                                          |
| --------------------------- | -------- | -------- | ---------------------------------------------------- |
| `styles`                    | Yes      | `Object` | Forms App styles properties                          |
| `formsApp.foregroundColour` | No       | `string` | Foreground colour of banner in Forms App             |
| `formsApp.highlightColour`  | No       | `string` | Highlight colour for elements that should stand out  |
| `formsApp.contrastColour`   | No       | `string` | Contrast colour applied against the highlight colour |
| `formsApp.customCss`        | No       | `string` | Custom CSS applied to the Forms App                  |
| `formsApp.logoUrl`          | No       | `string` | The absolute URL to the logo image in the Forms App  |

### Result (Resolved Promise)

```json
{
  "foregroundColour": "#E8E8E8",
  "highlightColour": "#0000FF",
  "contrastColour": "#FFFFFF",
  "customCss": ".ob-button { border-radius: 10px; }",
  "logoUrl": "http://logo.com/path/to/image.png"
}
```
