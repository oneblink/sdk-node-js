# OneBlink SDK | Jobs Class

## Constructor

| Parameter           | Required | Type     | Description                                                       |
| ------------------- | -------- | -------- | ----------------------------------------------------------------- |
| `options.accessKey` | Yes      | `string` | Access key provided by OneBlink, requires the `FORMS` permission. |
| `options.secretKey` | Yes      | `string` | Secret key provided by OneBlink, requires the `FORMS` permission. |

### Example

```javascript
const OneBlink = require('@oneblink/sdk')

const options = {
  accessKey: '123455678901ABCDEFGHIJKL',
  secretKey: '123455678901ABCDEFGHIJKL123455678901ABCDEFGHIJKL',
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
    type: 'Type',
    priority: 3,
  },
}

const preFillData = {
  text_element: 'abc',
  number_element: 123,
}

jobs.createJob(newJob, preFillData).then((job) => {
  // job.id can be used to delete the Job
})
```

### Parameters

| Parameter                    | Required | Type     | Description                                                                                                                                                                                                                                                      |
| ---------------------------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `newJob`                     | Yes      | `Object` | The Job to create                                                                                                                                                                                                                                                |
| `newJob.username`            | Yes      | `string` | The identifier of the User to assign the Job to                                                                                                                                                                                                                  |
| `newJob.formId`              | Yes      | `number` | The identifier of the Form the User must complete                                                                                                                                                                                                                |
| `newJob.externalId`          | No       | `string` | The external identifier of the form submission you wish to use, this identifier will be returned to you with the `submissionId` after a successful submission to allow you to retrieve the data later                                                            |
| `newJob.details`             | Yes      | `Object` | Extra Job details that will be displayed to the User                                                                                                                                                                                                             |
| `newJob.details.key`         | No       | `string` | A key for the User to identify the Job                                                                                                                                                                                                                           |
| `newJob.details.title`       | Yes      | `string` | A title for the User to identify the Job                                                                                                                                                                                                                         |
| `newJob.details.description` | No       | `string` | A short description of what the job may entail                                                                                                                                                                                                                   |
| `newJob.details.type`        | No       | `string` | A type for the User to categorise the Job                                                                                                                                                                                                                        |
| `newJob.details.priority`    | No       | `number` | Value used to order jobs by priority in the OneBlink system, with 1 being the highest priority. The OneBlink System will order jobs by priority and the date the job is created (oldest to newest). Jobs without a priority will appear below jobs with priority |
| `preFillData`                | No       | `Object` | key/value pairs with the form field names as keys and the pre-fill data as the values                                                                                                                                                                            |

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
    "type": "Type",
    "priority": 3
  }
}
```

## Delete Single Job

### Example

```javascript
const jobId = 'f73985fd-2dba-4bf7-abbe-e204889f5216'
jobs.deleteJob(jobId).then(() => {
  // Job has been deleted
})
```

### Parameters

| Parameter | Required | Type     | Description                                |
| --------- | -------- | -------- | ------------------------------------------ |
| `jobId`   | Yes      | `string` | The exact id of the job you wish to delete |

### Result (Resolved Promise)

- No return value (`undefined`)

## Search Jobs

### Example

```javascript
const results = await jobs.searchJobs({
  username: 'user@domain.io',
  formId: 10,
})

// an array of jobs
const jobs = results.jobs
```

### Parameters

| Parameter             | Required | Type      | Description                                                                           |
| --------------------- | -------- | --------- | ------------------------------------------------------------------------------------- |
| `options`             | No       | `Object`  | Search options                                                                        |
| `options.externalId`  | No       | `string`  | The `externalId` property of a job                                                    |
| `options.formId`      | No       | `number`  | The `formId` matching the form that a job was created for                             |
| `options.username`    | No       | `string`  | The `username` that the job was assigned to                                           |
| `options.isSubmitted` | No       | `boolean` | Whether the job has been submitted or not                                             |
| `options.limit`       | No       | `number`  | Limit the number of jobs returned                                                     |
| `options.offset`      | No       | `number`  | Skip a specific number of results, used in conjunction with `limit` to enforce paging |

### Result (Resolved Promise)

```json
{
  "meta": {
    "limit": null,
    "offset": null
  },
  "jobs": [
    {
      "id": "f73985fd-2dba-4bf7-abbe-e204889f5216",
      "isSubmitted": false,
      "createdAt": "2019-02-10T23:00:35.566Z",
      "username": "user@domain.io",
      "formId": 10,
      "externalId": "your-job-identifier",
      "details": {
        "key": "JOB-123",
        "title": "Job Title",
        "description": "Job description",
        "type": "Type",
        "priority": 3
      }
    }
  ]
}
```
