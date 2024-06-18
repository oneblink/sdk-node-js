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
