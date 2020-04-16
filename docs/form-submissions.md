# OneBlink SDK | Form Submissions

## Getting Started

1.  Ensure your form is configured with a Submission Event endpoint to call after a successful form submission

1.  Create your form submission URL to send users to the a renderer form using [`generateFormUrl()`](./forms.md#GenerateFormURL)

1.  After a successful form submission, you server will be called via the endpoint specified during form creation with a `submissionId` and `externalId`

1.  Use the OneBlink `submissionId` with the [`getSubmissionData()`](./forms.md#GetSubmissionData) function to retrieve the submission data.
