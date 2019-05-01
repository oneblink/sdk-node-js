# OneBlink SDK | Form Element Definitions

## Lookup Element

Lookup Element's contain properties that will optionally display a **Lookup** button adjacent to the element. See the [Lookup Documentation](https://support.oneblink.io/support/solutions/articles/42000057234-lookup) for more details.

| Property             | Required                       | Type      | Default | Description                                                                                     |
| -------------------- | ------------------------------ | --------- | ------- | ----------------------------------------------------------------------------------------------- |
| `isDataLookup`       | Yes                            | `boolean` | `false` | Determine if the element is a Data Lookup element (`true`) or not (`false`).                    |
| `dataLookupUrl`      | If `isDataLookup` is `true`    | `string`  |         | The URL to `POST` current current submission data to which will return updated submission data. |
| `dataLookupApiId`    | No                             | `string`  |         | The identifier of the OneBlink API the `dataLookupUrl` is associated with.                      |
| `isElementLookup`    | Yes                            | `boolean` | `false` | Determine if the element is a Data Lookup element (`true`) or not (`false`).                    |
| `elementLookupUrl`   | If `isElementLookup` is `true` | `string`  |         | The URL to `POST` current current submission data to which will return Form Elements inject.    |
| `elementLookupApiId` | No                             | `string`  |         | The identifier of the OneBlink API the `elementLookupUrl` is associated with.                   |
