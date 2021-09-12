# OneBlink SDK | FormsApp Definition

[Back to Documentation](../../README.md)

## NewFormsApp

| Property                       | Required | Type                                              | Description                                                                                                                  |
| ------------------------------ | -------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `name`                         | Yes      | `string`                                          | Name of the forms app                                                                                                        |
| `type`                         | Yes      | `string`                                          | Type of the forms app. Valid values are "FORMS_LIST", "TILES", "VOLUNTEER"                                                   |
| `slug`                         | Yes      | `string`                                          | Unique domain safe text to identify the app                                                                                  |
| `organisationId`               | Yes      | `string`                                          | The exact organisation identifier the forms app is associated with                                                           |
| `formsAppEnvironmentId`        | Yes      | `number`                                          | The exact forms app environment identifier the forms app is associated with                                                  |
| `formIds`                      | Yes      | `number[]`                                        | The identifiers of the forms that are in the forms app. The order of the forms is respected when rendering the list of forms |
| `pwaSettings`                  | Yes      | [FormsAppPwaSettings](./FormsAppPwaSettings.md)   | Forms App progressive web app setting properties                                                                             |
| `welcomeEmail`                 | No       | [FormsAppWelcomeEmail](./FormsAppWelcomeEmail.md) | Forms App custom welcome email properties                                                                                    |
| `notificationEmailAddresses`   | No       | `string[]`                                        | Array of emails addresses to be notified when an error occurs in processing submission events                                |
| `oAuthClientId`                | No       | `string`                                          | The identifier of the OAuth Client for the forms app                                                                         |
| `hasSamlIdentityProvider`      | No       | `boolean`                                         | True when using a SAML identity provider                                                                                     |
| `recaptchaIntegrationDomainId` | No       | `string`                                          | The id of the recaptcha integration to be used                                                                               |

## FormsApp

| Property                     | Required | Type                                              | Description                                                                                                                  |
| ---------------------------- | -------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `id`                         | Yes      | `number`                                          | Identifier of the forms app                                                                                                  |
| `name`                       | Yes      | `string`                                          | Name of the forms app                                                                                                        |
| `type`                       | Yes      | `string`                                          | Type of the forms app. Valid values are "FORMS_LIST", "TILES", "VOLUNTEER"                                                   |
| `slug`                       | Yes      | `string`                                          | Unique domain safe text to identify the app                                                                                  |
| `organisationId`             | Yes      | `string`                                          | The exact organisation identifier the forms app is associated with                                                           |
| `formsAppEnvironmentId`      | Yes      | `number`                                          | The exact forms app environment identifier the forms app is associated with                                                  |
| `formIds`                    | Yes      | `number[]`                                        | The identifiers of the forms that are in the forms app. The order of the forms is respected when rendering the list of forms |
| `pwaSettings`                | Yes      | [FormsAppPwaSettings](./FormsAppPwaSettings.md)   | Forms App progressive web app setting properties                                                                             |
| `welcomeEmail`               | No       | [FormsAppWelcomeEmail](./FormsAppWelcomeEmail.md) | Forms App custom welcome email properties                                                                                    |
| `notificationEmailAddresses` | No       | `string[]`                                        | Array of emails addresses to be notified when an error occurs in processing submission events                                |
| `oAuthClientId`              | Yes      | `string`                                          | The identifier of the OAuth Client for the forms app **(Do not change this)**                                                |
| `hasSamlIdentityProvider`    | No       | `boolean`                                         | True when using a SAML identity provider                                                                                     |
| `isClientLoggingEnabled`     | No       | `boolean`                                         | Whether the forms app has client logging enabled                                                                             |

## RetrievedFormsApp

This is the schema that will be returned when creating, updating or getting a forms app.

| Property                     | Required | Type                                              | Description                                                                                                                  |
| ---------------------------- | -------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `id`                         | Yes      | `number`                                          | Identifier of the forms app                                                                                                  |
| `name`                       | Yes      | `string`                                          | Name of the forms app                                                                                                        |
| `type`                       | Yes      | `string`                                          | Type of the forms app. Valid values are "FORMS_LIST", "TILES", "VOLUNTEER"                                                   |
| `slug`                       | Yes      | `string`                                          | Unique domain safe text to identify the app                                                                                  |
| `organisationId`             | Yes      | `string`                                          | The exact organisation identifier the forms app is associated with                                                           |
| `formsAppEnvironmentId`      | Yes      | `number`                                          | The exact forms app environment identifier the forms app is associated with                                                  |
| `formIds`                    | Yes      | `number[]`                                        | The identifiers of the forms that are in the forms app. The order of the forms is respected when rendering the list of forms |
| `pwaSettings`                | Yes      | [FormsAppPwaSettings](./FormsAppPwaSettings.md)   | Forms App progressive web app setting properties                                                                             |
| `welcomeEmail`               | No       | [FormsAppWelcomeEmail](./FormsAppWelcomeEmail.md) | Forms App custom welcome email properties                                                                                    |
| `notificationEmailAddresses` | No       | `string[]`                                        | Array of emails addresses to be notified when an error occurs in processing submission events                                |
| `oAuthClientId`              | Yes      | `string`                                          | The identifier of the OAuth Client for the forms app **(Do not change this)**                                                |
| `hasSamlIdentityProvider`    | Yes      | `boolean`                                         | True when using a SAML identity provider                                                                                     |
| `styles`                     | Yes      | `FormsAppStyles`                                  | Forms App custom styles and menu items                                                                                       |
| `hostname`                   | Yes      | `string`                                          | The full hostname of the Forms App, including the `slug` property                                                            |
| `isClientLoggingEnabled`     | No       | `boolean`                                         | Whether the forms app has client logging enabled                                                                             |
| `createdAt`                  | Yes      | `string`                                          | The time the forms app was created, represented by an ISO date                                                               |
| `updatedAt`                  | Yes      | `string`                                          | The time the forms app was last updated, represented by an ISO date                                                          |

## Examples

### NewFormsApp

```JSON
{
  "name": "My Forms App",
  "type": "FORMS_LIST",
  "slug": "my-forms-app",
  "organisationId": "1t7144d2c0d36b3100004316",
  "formsAppEnvironmentId": 24,
  "formIds": [1, 2, 3],
  "pwaSettings": {
    "homeScreenName": "My Home Screen",
    "splashScreenName": "My Splash Screen",
    "homeScreenIconUrl": "https://my-website.com/icon.png"
  },
  "welcomeEmail": {
    "subject": "My Home Screen",
    "body": "My Splash Screen"
  },
  "notificationEmailAddresses": ["emailaddress1@gmail.com", "emailaddress2@gmail.com"]
}
```

### FormsApp

```JSON
{
  "id": 1,
  "name": "My Updated Forms App",
  "type": "FORMS_LIST",
  "slug": "my-forms-app",
  "organisationId": "1t7144d2c0d36b3100004316",
  "formsAppEnvironmentId": 24,
  "formIds": [1, 2, 3],
  "pwaSettings": {
    "homeScreenName": "My Home Screen",
    "splashScreenName": "My Splash Screen",
    "homeScreenIconUrl": "https://my-website.com/icon.png"
  },
  "welcomeEmail": {
    "subject": "My Home Screen",
    "body": "My Splash Screen"
  },
  "notificationEmailAddresses": ["emailaddress1@gmail.com", "emailaddress2@gmail.com"],
  "oAuthClientId": "123456789012abcdefghijkl",
  "isClientLoggingEnabled": false
}
```

### RetrievedFormsApp

```JSON
{
  "id": 1,
  "name": "My Forms App",
  "type": "FORMS_LIST",
  "slug": "my-forms-app",
  "organisationId": "1t7144d2c0d36b3100004316",
  "formsAppEnvironmentId": 24,
  "formIds": [1, 2, 3],
  "pwaSettings": {
    "homeScreenName": "My Home Screen",
    "splashScreenName": "My Splash Screen",
    "homeScreenIconUrl": "https://my-website.com/icon.png"
  },
  "welcomeEmail": {
    "subject": "My Home Screen",
    "body": "My Splash Screen"
  },
  "notificationEmailAddresses": ["emailaddress1@gmail.com", "emailaddress2@gmail.com"],
  "oAuthClientId": "123456789012abcdefghijkl",
  "hasSamlIdentityProvider": false,
  "hostname": "organisation-my-forms-app.app.oneblink.io",
  "styles": {
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
  },
  "isClientLoggingEnabled": false,
  "createdAt": "2021-02-08 12:02:23",
  "updatedAt": "2021-02-08 12:46:54"
}
```
