# OneBlink SDK | Jobs Class

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
  secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL'
}
const jobs = new OneBlink.Jobs(options)
```

## Create Single Job

### Example

```javascript
const newJob = {
  username: 'user@domain.io',
  formId: 1,
  externalId: 'your-job-identifier',
  details: {
    key: 'JOB-123',
    title: 'Job Title',
    description: 'Job description',
    type: 'Type'
  }
}
const preFillData = {
  text_element: 'abc',
  number_element: 123
}
jobs.createJob(newJob, preFillData)
  .then((job) => {
    // job.id can be used to delete the Job
  })
```

### Parameters

| Parameter                    | Required | Type     | Description                                                                                                                                                                                           |
| ---------------------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `newJob`                     | Yes      | `Object` | The Job to create                                                                                                                                                                                     |
| `newJob.username`            | Yes      | `string` | The identifier of the User to assign the Job to                                                                                                                                                       |
| `newJob.formId`              | Yes      | `number` | The identifier of the Form the User must complete                                                                                                                                                     |
| `newJob.externalId`          | No       | `string` | The external identifier of the form submission you wish to use, this identifier will be returned to you with the `submissionId` after a successful submission to allow you to retrieve the data later |
| `newJob.details`             | No       | `Object` | Extra Job details that will be displayed to the User                                                                                                                                                  |
| `newJob.details.key`         | No       | `string` | A key for the User the identify the Job                                                                                                                                                               |
| `newJob.details.title`       | No       | `string` | A title for the User the identify the Job                                                                                                                                                             |
| `newJob.details.description` | No       | `string` | A short description of the what the job may entail                                                                                                                                                    |
| `newJob.details.type`        | No       | `string` | A type for the User to categorise the Job                                                                                                                                                             |
| `preFillData`                | No       | `Object` | key/value pairs  with the form field names as keys and the pre-fill data as the values                                                                                                                |

### Result (Resolved Promise)

```json
{
  "id": "f73985fd-2dba-4bf7-abbe-e204889f5216",
  "isSubmitted": false,
  "createdAt": "2019-02-10T23:00:35.566Z",
  "username": "user@domain.io",
  "formId": 1,
  "externalId": "your-job-identifier",
  "details": {
    "key": "JOB-123",
    "title": "Job Title",
    "description": "Job description",
    "type": "Type"
  }
}
```

## Delete Single Job

### Example

```javascript
const jobId = 'f73985fd-2dba-4bf7-abbe-e204889f5216'
jobs.deleteJob(jobId)
  .then(() => {
    // Job has been deleted
  })
```

### Parameters

| Parameter | Required | Type     | Description                             |
| --------- | -------- | -------- | --------------------------------------- |
| `keyId`   | Yes      | `string` | The exact id of the key you wish to get |

### Result (Resolved Promise)

-   No return value (`undefined`)
