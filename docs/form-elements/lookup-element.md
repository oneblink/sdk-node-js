# OneBlink SDK | Form Element Definitions

## Lookup Element

Lookup Element's contain properties that will optionally display a **Lookup** button adjacent to the element. See the [Lookup Documentation](https://support.oneblink.io/support/solutions/articles/42000057234-lookup) for more details.

| Property          | Required                       | Type      | Default | Description                                                                                               |
| ----------------- | ------------------------------ | --------- | ------- | --------------------------------------------------------------------------------------------------------- |
| `isDataLookup`    | Yes                            | `boolean` | `false` | Determine if the element is a Data Lookup element (`true`) or not (`false`).                              |
| `dataLookupId`    | If `isDataLookup` is `true`    | `number`  |         | The Id of the Data Lookup configured in the OneBlink System which will return updated submission data.    |
| `isElementLookup` | Yes                            | `boolean` | `false` | Determine if the element is a Data Lookup element (`true`) or not (`false`).                              |
| `elementLookupId` | If `isElementLookup` is `true` | `number`  |         | The Id of the Element Lookup configured in the OneBlink System which will return Form Elements to inject. |
