# OneBlink SDK | FormsAppWelcomeEmail Definition

[Back to FormsApp](./README.md)

## FormsAppWelcomeEmail

| Property  | Required | Type     | Description                                                                                                                                                                                                             |
| --------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `subject` | No       | `string` | The subject to use when sending welcome emails to new app users                                                                                                                                                         |
| `body`    | No       | `string` | A [mustache](http://mustache.github.io/#demo) template to use when sending welcome emails to new app users. See [`createUser()`](../../forms-apps.md#createuser) for passing additional parameters for a specific user. |

### Example

```JSON
{
  "subject": "My Home Screen",
  "body": "My Splash Screen"
}
```
