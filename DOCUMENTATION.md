# OneBlink SDK | Usage

## Requirements

- [Node.js](https://nodejs.org/) 18.0 or newer
- NPM 10.0 or newer

## Installation

```sh
npm install @oneblink/sdk --save
```

## Tenants

This SDK is the entry point for all OneBlink Productivity instances. The default instance is the [OneBlink Console](https://console.oneblink.io). To use a different tenant to the default, change the require path to include the desired tenant. The available tenants are:

- [OneBlink Console](https://console.oneblink.io)

  ```js
  const OneBlink = require('@oneblink/sdk')
  // or
  const OneBlink = require('@oneblink/sdk/tenants/oneblink')
  ```

- [CivicOptimize Productivity](https://console.transform.civicplus.com)

  ```js
  const CivicPlus = require('@oneblink/sdk/tenants/civicplus')
  ```

Once the SDK has been `required`, all class documentation below applies to all tenants. However, all of the examples use the default tenant. If you copy and paste from the examples, please don't forget to change (replacing `my-tenant` with a valid tenant path):

```js
const OneBlink = require('@oneblink/sdk')
// to
const MyTenant = require('@oneblink/sdk/tenants/my-tenant')
```

## Typescript

This SDK also supports [Typescript Modules](https://www.typescriptlang.org/docs/handbook/modules.html):

```ts
import * as OneBlink from '@oneblink/sdk'
```

Various Types used in this package can also be imported:

```ts
import * as Types from '@oneblink/sdk/types'
```

## Permissions

The majority of actions in this SDK require that your developer key has particular permissions. These permissions can be set in your tenant's console. If you do not have access to your tenant's console, you will need to work with your Administrator to associate the permissions that you require with your key. The associated permissions for each function are detailed on the function definitions.

### Developer Key & Role

Actions that require a developer key with a minimum role permission will have the following in the function definition:

**Minimum Role Permission**

The developer key used must be assigned a role with at least the permission documented for each action. E.g. If the action's minimum role permission is _Forms: Read Only_, the role assigned to the developer key could have _Forms: Read Only_ or _Forms: Manager_.

### Developer Key & App Association

Actions that require a developer key to be assigned to an app will have the following in the function definition:

**App Association Required**

These actions require the developer key to be associated with an app that is associated with the form that is being actioned. A form can be associated with an app in the following ways:

- For _Forms List_ type apps, the form must be in the Forms List menu item.
- For _Tiles_ type apps, the form can be in a _Container_ menu item or added directly to the menu via a _Form_ menu item.
- For _Tiles_ or _Forms List_ type apps, the form can be assigned to an action in a scheduled task.
- For _Approvals_ type apps, the form can be an approval form.
