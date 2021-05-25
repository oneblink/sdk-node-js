# OneBlink SDK | Form Element Definitions

## Options Element

This element contains properties that all Option Type Form Elements inherit as additional properties.

| Property                             | Required                                 | Type                 | Default    | Description                                                                                                            |
| ------------------------------------ | ---------------------------------------- | -------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| `conditionallyShowOptions`           | Yes                                      | `boolean`            | `false`    | Whether or not the elements options are to be shown conditionally.                                                     |
| `conditionallyShowOptionsElementIds` | if `conditionallyShowOptions` is `true`  | `string[]`           |            | the ID(s) of elements used in the 'conditionally show' process.                                                        |
| `options`                            | Yes                                      | `option[]`           |            | An array of options, relevant to the element.                                                                          |
| `optionsType`                        | Yes                                      | `string`             | `'CUSTOM'` | Whether or not the options set is defined within the form definition (custom), or via an API call (dynamic OR search). |
| `option[].id`                        | Yes                                      | `string`             | `{guid}`   | The unique identifier for an individual option.                                                                        |
| `option[].dynamicOptionSetId`        | if `option[].optionsType` is `'DYNAMIC'` | `string`             | `{guid}`   | The ID of the dynamic options set configured in the OneBlink System.                                                   |
| `option[].value`                     | Yes                                      | `string`             |            | The value for an individual option, sent with form submission data.                                                    |
| `option[].label`                     | Yes                                      | `string`             |            | The label displayed to the user for an individual option.                                                              |
| `option[].colour`                    | No                                       | `string`             |            | The color of the button used to display the option, if the element has `buttons` configured as `true`.                 |
| `option[].attributes`                | no                                       | `attribute[]`        |            | An array of option attributes associated with an individual option.                                                    |
| `option[].attribute[].optionIds`     | Yes                                      | `string[]`           |            | An array of option IDs associated with an individual option                                                            |
| `option[].attribute[].elementId`     | Yes                                      | `string`             |            | The external element ID used in the 'conditionally show option' process                                                |
| `attributesMapping`                  | no                                       | `attributeMapping[]` |            | Used to map an attribute from a dynamic options source with an option element ID within the form definition            |
| `attributeMapping[].elementId`       | yes                                      | `string`             |            | The ID of the option value for the attribute to be mapped to.                                                          |
| `attributeMapping[].attribute`       | yes                                      | `string`             |            | The attribute from the dynamic options set to be mapped to the option element ID.                                      |
