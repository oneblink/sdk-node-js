# OneBlink SDK | Form Element Definitions

## Base Element

This element contains properties that all Form Elements inherit as base properties.

| Property                                 | Required                         | Type                                              | Default  | Description                                                                                                           |
| ---------------------------------------- | -------------------------------- | ------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `id`                                     | Yes                              | `string`                                          | `{guid}` | The unique identifier for an individual form element.                                                                 |
| `conditionallyShow`                      | Yes                              | `boolean`                                         | `false`  | Determine if the element is conditionally shown (`true`) or not (`false`).                                            |
| `requiresAllConditionallyShowPredicates` | Yes                              | `boolean`                                         | `false`  | Determine if the predicates must all match (`true`) or if only one needs to match (`false`) for the element to shown. |
| `conditionallyShowPredicates`            | If `conditionallyShow` is `true` | [`ConditionalPredicate[]`](#conditionalpredicate) |          | Predicates to evaluate.                                                                                               |

## ConditionalPredicate

| Property    | Required                 | Type                                                    | Default     | Description                                                                                        |
| ----------- | ------------------------ | ------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| `elementId` | Yes                      | `string`                                                |             | The identifier of the element to evaluate against                                                  |
| `type`      | Yes                      | `'NUMERIC' \| 'OPTIONS'`                                | `'OPTIONS'` | Evaluate against a numeric type element or an element with options                                 |
| `value`     | If `type` is `'NUMERIC'` | `number`                                                |             | The value to compare against the predicate element                                                 |
| `operator`  | If `type` is `'NUMERIC'` | `'===' \| '!==' \| '>' \| '>=' \| '<' \| '<=' \| '==='` |             | How the predicate element's value will be compared to `value`                                      |
| `optionIds` | If `type` is `'OPTIONS'` | `string[]`                                              |             | The predicate element option identifiers that must be selected for this predicate to evaluate true |
