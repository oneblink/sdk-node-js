# OneBlink SDK | Form Element Definitions

## Custom Validation Element

This element contains properties that some user input Form Elements inherit as base properties.

| Property       | Required | Type     | Description                                                                                                                                                                                  |
| -------------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `regexPattern` | No       | `string` | The regex pattern used for custom validation.                                                                                                                                                |
| `regexFlags`   | No       | `string` | The flags to apply to custom regex validation. Must adhere to the `flags` section found here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp |
| `regexMessage` | No       | `string` | The message displayed when regex validation failed.                                                                                                                                          |
