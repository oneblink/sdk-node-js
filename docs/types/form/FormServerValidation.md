# OneBlink SDK | FormServerValidation Definition

[Back to Form](./README.md)

## FormServerValidation

| Property        | Required | Type                                                                                      | Description                                   |
| --------------- | -------- | ----------------------------------------------------------------------------------------- | --------------------------------------------- |
| `type`          | yes      | `'CALLBACK' \| 'ONEBLINK_API'`                                                            | The type of the validation endpoint.          |
| `configuration` | yes      | `CallbackValidationEndpointConfiguration` \| `OneBlinkAPIValidationEndpointConfiguration` | The configuration of the validation endpoint. |

## CallbackServerValidationConfiguration

| Property | Required | Type     | Description                         |
| -------- | -------- | -------- | ----------------------------------- |
| `url`    | yes      | `string` | The url of the validation endpoint. |

## OneBlinkAPIServerValidationConfiguration

| Property              | Required | Type     | Description                                                            |
| --------------------- | -------- | -------- | ---------------------------------------------------------------------- |
| `apiId`               | yes      | `string` | The ID of the OneBlink hosted API that houses the validation endpoint. |
| `apiEnvironment`      | yes      | `string` | The environment of the specified OneBlink hosted API.                  |
| `apiEnvironmentRoute` | yes      | `string` | The route of the validation endpoint.                                  |

### Examples

#### Callback

```JSON
{
  "type": "CALLBACK",
  "configuration": {
    "url": "https://api.url.com/callback",
  },
}
```

#### OneBlink API

```JSON
{
  "type": "ONEBLINK_API",
  "configuration": {
    "apiId": "oneblink-api-id",
    "apiEnvironment": "test",
    "apiEnvironmentRoute": "/my-route"
  },
}
```
