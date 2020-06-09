# OneBlink SDK | TeamMembers Class

## Instance Functions

- [`getTeamMemberRole()`](#getteammemberrole)

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
  secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
}
const teamMembersSDK = new OneBlink.TeamMembers(options)
```

## `getTeamMemberRole()`

### Example

```javascript
const email = 'email@domain.io'
teamMembersSDK.getTeamMemberRole(email).then((role) => {
  if (role !== null) {
    // Use role here...
  }
})
```

### Parameters

| Parameter | Required | Type     | Description                                     |
| --------- | -------- | -------- | ----------------------------------------------- |
| `email`   | Yes      | `string` | The email address the team member uses to login |

### Result (Resolved Promise)

Either the role the team member has been unsigned (see below) or `null`

```json
{
  "id": 1,
  "name": "Roles Name",
  "description": "Description",
  "organisationId": "1234566789012abcdefghijk",
  "privilege": {
    "AUTH": "MANAGER",
    "KEYS": "MANAGER",
    "FORMS": "MANAGER",
    "BUILDBOT": "BUILDER",
    "ANALYTICS": "ANALYST",
    "FORMS_APPS": "MANAGER",
    "API_HOSTING": "MANAGER",
    "FORMS_APP_USERS": "MANAGER",
    "WEB_APP_HOSTING": "MANAGER",
    "FORMS_APP_STYLES": "MANAGER",
    "FORM_SUBMISSIONS": "READONLY",
    "FORM_OPTIONS_SETS": "MANAGER"
  }
}
```
