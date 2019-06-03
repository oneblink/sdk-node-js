# OneBlink SDK | FormsApps Class

## Functions

- [`createFormsApp()`](#createformsapp)
- [`createUser()`](#createuser)
- [`deleteFormsApp()`](#deleteformsapp)
- [`deleteUser()`](#deleteuser)
- [`getFormsApp()`](#getformsapp)
- [`getMyFormsApp()`](#getmyformsapp)
- [`updateFormsApp()`](#updateformsapp)
- [`updateStyles()`](#updatestyles)

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
  name: 'My Application',
  hostname: 'customer-my.app.oneblink.io',
  pwaSettings: {
    homeScreenName: 'App',
    splashScreenName: 'Application'
  },
  organisationId: 'ABCDEFGHIJKL123456789012',
  formIds: []
}
formsAppsSDK.createFormsApp(formsApp).then(savedFormsApp => {
  // Use Forms App here...
})
```

### Parameters

| Parameter                                | Required | Type       | Description                                                                                                                                                                                          |
| ---------------------------------------- | -------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `formsApp`                               | Yes      | `Object`   | Forms App properties                                                                                                                                                                                 |
| `formsApp.name`                          | Yes      | `string`   | Name of the forms app                                                                                                                                                                                |
| `formsApp.hostname`                      | Yes      | `string`   | Hostname (domain) for the forms app                                                                                                                                                                  |
| `formsApp.organisationId`                | Yes      | `string`   | The exact organisation identifier the forms app is associated with                                                                                                                                   |
| `formsApp.formIds`                       | Yes      | `number[]` | The identifiers of the forms that are in the forms app. The order of the forms is respected when rendering the list of forms                                                                         |
| `formsApp.pwaSettings`                   | Yes      | `Object`   | Forms App progressive web app setting properties                                                                                                                                                     |
| `formsApp.pwaSettings.homeScreenName`    | No       | `string`   | The text beneath the app icon when installed as a progressive web app on mobile devices                                                                                                              |
| `formsApp.pwaSettings.splashScreenName`  | No       | `string`   | The text on the splash screen when installed as a progressive web app on mobile devices                                                                                                              |
| `formsApp.pwaSettings.homeScreenIconUrl` | No       | `string`   | The absolute URL to the app icon that is displayed when installed as a progressive web app on mobile devices                                                                                         |
| `formsApp.welcomeEmail`                  | No       | `Object`   | Forms App custom welcome email properties                                                                                                                                                            |
| `formsApp.welcomeEmail.subject`          | No       | `string`   | The subject to use when sending welcome emails to new app users                                                                                                                                      |
| `formsApp.welcomeEmail.body`             | No       | `string`   | A [mustache](http://mustache.github.io/#demo) template to use when sending welcome emails to new app users. See [`createUser()`](#createuser) for passing additional parameters for a specific user. |

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

## `createUser()`

Create a Forms App User

### Example

```javascript
const formsAppUser = {
  email: 'email@domain.io',
  formsAppId: 1,
  generatePassword: true,
  welcomeEmailParameters: {
    company: 'Company Name'
  }
}
formsAppsSDK.createUser(formsAppUser).then(savedFormsAppUser => {
  // Use Forms App User here...
})
```

### Parameters

| Parameter                             | Required | Type      | Description                                                                                                                                                           |
| ------------------------------------- | -------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `formsAppUser`                        | Yes      | `Object`  | Forms App User properties                                                                                                                                             |
| `formsAppUser.email`                  | Yes      | `string`  | Email address of the Forms App User                                                                                                                                   |
| `formsAppUser.formsAppId`             | Yes      | `number`  | The exact Forms App identifier the Forms App User is associated with                                                                                                  |
| `formsAppUser.generatePassword`       | Yes      | `boolean` | Determine if a password is generated for the Forms App User (`true`) or not (`false`). Specify `false` if the user is using a social provider (e.g. Google) to login. |
| `formsAppUser.welcomeEmailParameters` | No       | `Object`  | Additional parameters to be passed to the welcome email template for the form app matching the `formsAppId`                                                           |

#### Welcome Email Parameters

The following parameters for the welcome email [mustache](http://mustache.github.io/#demo) template are already taken and will be overridden if supplied:

| Parameter              | type      | Description                                                                                           |
| ---------------------- | --------- | ----------------------------------------------------------------------------------------------------- |
| `formsAppUrl`          | `string`  | The URL for the Forms App, use this to allow your new user to click the a link and open the Forms App |
| `formsAppName`         | `string`  | The name of the Forms App                                                                             |
| `coloursHighlight`     | `string`  | The `highlightColour` set in the `styles` for the Forms App                                           |
| `coloursContrast`      | `string`  | The `contrastColour` set in the `styles` for the Forms App                                            |
| `displayPassword`      | `boolean` | Determine if a password will be included in the welcome email (`true`) or not (`false`)               |
| `showExistingPassword` | `boolean` | Determine if a the user already has a password in the system (`true`) or not (`false`)                |
| `password`             | `string`  | The new users temporary password                                                                      |

### Result (Resolved Promise)

```json
{
  "id": 1,
  "email": "email@domain.io",
  "formsAppId": 1,
  "createdAt": "2018-06-01T00:00:00.000Z"
}
```

## `deleteFormsApp()`

Delete a Forms App by its identifier

### Example

```javascript
const formsAppId = 1
formsAppsSDK.deleteFormsApp(formsAppId).then(() => {
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

## `deleteUser()`

Delete a Forms App User by its identifier

### Example

```javascript
const formsAppUserId = 1
formsAppsSDK.deleteUser(formsAppUserId).then(() => {
  // Forms App User has been deleted...
})
```

### Parameters

| Parameter        | Required | Type     | Description                                            |
| ---------------- | -------- | -------- | ------------------------------------------------------ |
| `formsAppUserId` | Yes      | `number` | The exact Forms App User identifier you wish to delete |

### Result (Resolved Promise)

```js
undefined
```

## `getFormsApp()`

Get a single Forms App by its identifier

### Example

```javascript
const formsAppId = 1
formsAppsSDK.getFormsApp(formsAppId).then(formsApp => {
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

## `getMyFormsApp()`

Get a single Forms App for the Bearer token of a Forms App User

### Example

```javascript
const bearerToken = ''
formsAppsSDK.getMyFormsApp(bearerToken).then(formsApp => {
  // Use Forms App here...
})
```

### Parameters

| Parameter     | Required | Type     | Description                                                                    |
| ------------- | -------- | -------- | ------------------------------------------------------------------------------ |
| `bearerToken` | Yes      | `string` | The Bearer token in the `Authorization` header from a request from an App User |

### Result (Resolved Promise)

Same as [`getFormsApp()`](#getformsapp)

## `updateFormsApp()`

Update a Forms App

### Example

```javascript
const formsApp = {
  id: 1,
  name: 'My Application',
  hostname: 'customer-my.app.oneblink.io',
  oAuthClientId: '123456789012abcdefghijkl',
  pwaSettings: {
    homeScreenName: 'App',
    splashScreenName: 'Application'
  },
  createdAt: '2018-06-01T00:00:00.000Z',
  updatedAt: '2019-05-17T05:49:14.000Z',
  organisationId: 'ABCDEFGHIJKL123456789012',
  formIds: []
}
formsAppsSDK.updateFormsApp(formsApp).then(savedFormsApp => {
  // Use Forms App here...
})
```

### Parameters

| Parameter                                | Required | Type       | Description                                                                                                                                                                                          |
| ---------------------------------------- | -------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `formsApp`                               | Yes      | `Object`   | Forms App properties                                                                                                                                                                                 |
| `formsApp.id`                            | Yes      | `number`   | Identifier of the forms app                                                                                                                                                                          |
| `formsApp.name`                          | Yes      | `string`   | Name of the forms app                                                                                                                                                                                |
| `formsApp.hostname`                      | Yes      | `string`   | Hostname (domain) for the forms app                                                                                                                                                                  |
| `formsApp.organisationId`                | Yes      | `string`   | The exact organisation identifier the forms app is associated with                                                                                                                                   |
| `formsApp.oAuthClientId`                 | Yes      | `string`   | The identifier of the OAuth Client for the forms app **(Do not change this)**.                                                                                                                       |
| `formsApp.formIds`                       | Yes      | `number[]` | The identifiers of the forms that are in the forms app. The order of the forms is respected when rendering the list of forms                                                                         |
| `formsApp.pwaSettings`                   | Yes      | `Object`   | Forms App progressive web app setting properties                                                                                                                                                     |
| `formsApp.pwaSettings.homeScreenName`    | No       | `string`   | The text beneath the app icon when installed as a progressive web app on mobile devices                                                                                                              |
| `formsApp.pwaSettings.splashScreenName`  | No       | `string`   | The text on the splash screen when installed as a progressive web app on mobile devices                                                                                                              |
| `formsApp.pwaSettings.homeScreenIconUrl` | No       | `string`   | The absolute URL to the app icon that is displayed when installed as a progressive web app on mobile devices                                                                                         |
| `formsApp.welcomeEmail`                  | No       | `Object`   | Forms App custom welcome email properties                                                                                                                                                            |
| `formsApp.welcomeEmail.subject`          | No       | `string`   | The subject to use when sending welcome emails to new app users                                                                                                                                      |
| `formsApp.welcomeEmail.body`             | No       | `string`   | A [mustache](http://mustache.github.io/#demo) template to use when sending welcome emails to new app users. See [`createUser()`](#createuser) for passing additional parameters for a specific user. |

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
  foregroundColour: '#E8E8E8',
  highlightColour: '#0000FF',
  contrastColour: '#FFFFFF',
  customCss: '.ob-button { border-radius: 10px; }',
  logoUrl: 'http://logo.com/path/to/image.png'
}
formsAppsSDK.updateStyles(formsAppId, styles).then(() => {
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
