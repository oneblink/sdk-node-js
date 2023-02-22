# OneBlink SDK [![npm module](https://img.shields.io/npm/v/@oneblink/sdk.svg)](https://www.npmjs.com/package/@oneblink/sdk) [![tests](https://github.com/oneblink/sdk-node-js/actions/workflows/test.yml/badge.svg)](https://github.com/oneblink/sdk-node-js/actions)

OneBlink SDK to serve as an entry point for all OneBlink Services in NodeJS

## Documentation

See the [Documentation](https://oneblink.github.io/sdk-node-js/) for more details.

## Migrating to v2

### Forms.search()

In previous versions (< 2.0), this function returned all forms in one call. This is no longer the case and mandatory pagination is now enforced.

If no `limit` is provided, this is set to 200. If no `offset` is provided, this is set to `0`.

If you currently have more than 200 forms returned from this function, or expect to have more than 200 forms returned, you will need to update your code to account for this.
If you do need to account for this, accessing all forms as you previously could now requires that you make multiple calls to this function. This could look something like:

```javascript
const { Forms } = require('@oneblink/sdk')

const options = {
  accessKey: '123455678901ABCDEFGHIJKL',
  secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
}
const forms = new Forms(options)

const nextOffset = 0
const forms = []

while (nextOffset !== undefined) {
  var result = await forms.searchForms({
    // ...filters
    limit: 100,
    offset: nextOffset,
  })
  forms.push(result.forms)
  nextOffset = result.meta.nextOffset
}

// Use `forms`
```

Alternately, you could integrate pagination directly into your application.
