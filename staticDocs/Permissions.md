# OneBlink Role Permissions

There are a collections of permissions that are required to use different functions within the OneBlink SDK. These permissions can be set within the [OneBlink Console](console.oneblink.io). If you do not have access, you will need to work with your Administrator to set the permissions that you need.
Without certain permissions, you will be unable to complete actions with the OneBlink SDK. The required permissions are included on the function and they will be listed below.

## Endpoints and their Required Roles

### Approvals

| Endpoint                                      | Permission | Permission Level |
| --------------------------------------------- | ---------- | ---------------- |
| getFormApprovalFlowInstance()                 | FaaS       | Developer        |
| getFormSubmissionApproval()                   | FaaS       | Developer        |
| searchFormSubmissionAdministrationApprovals() | FaaS       | Developer        |

### Data Manager

| Endpoint            | Permission       | Permission Level   |
| ------------------- | ---------------- | ------------------ |
| getFormDefinition() | Form Submissions | Manager, Read Only |
| searchRecords()     | Form Submissions | Manager, Read Only |

### Email Templates

| Endpoint              | Permission      | Permission Level   |
| --------------------- | --------------- | ------------------ |
| createEmailTemplate() | Email Templates | Manager            |
| deleteEmailTemplate() | Email Templates | Manager            |
| getEmailTemplate()    | Email Templates | Manager, Read Only |
| searchEmailTemplate() | Email Templates | Manager, Read Only |
| updateEmailTemplate() | Email Templates | Manager            |

### Form Element Lists

| Endpoint                 | Permission         | Permission Level |
| ------------------------ | ------------------ | ---------------- |
| createFormElementList()  | Form Element Lists | Manager          |
| deleteFormElementList()  | Form Element Lists | Manager          |
| searchFormElementLists() | ---                | ---              |
| updateFormElementList()  | Form Element Lists | Manager          |

### Form Element Lookups

| Endpoint                   | Permission           | Permission Level   |
| -------------------------- | -------------------- | ------------------ |
| createFormElementLookup()  | Form Element Lookups | Manager            |
| deleteFormElementLookup()  | Form Element Lookups | Manager            |
| getFormElementLookup()     | Form Element Lookups | Manager, Read Only |
| searchFormElementLookups() | ---                  | ---                |
| updateFormElementLookup()  | Form Element Lookups | Manager            |

### Forms

| Endpoint                          | Permission       | Permission Level   |
| --------------------------------- | ---------------- | ------------------ |
| createForm()                      | Forms            | Manager            |
| createSubmissionAttachment()      | FaaS             | Developer          |
| deleteForm()                      | Forms            | Manager            |
| executeWorkflowEvent()            | Form Submissions | Manager            |
| generateFormUrl()                 | Forms\*          | Manager, Read Only |
|                                   | Apps             | Manager, Read Only |
|                                   | FaaS\*\*         | Developer          |
| generateSubmissionAttachmentUrl() | Form Submissions | Manager, Read Only |
| generateSubmissionDataUrl()       | Form Submissions | Manager, Read Only |
| generateWorkflowAttachmentLink()  | Form Submissions | Manager, Read Only |
| getForm()                         | Form             | Manager, Read Only |
| getFormSubmissionMeta()           | Form Submissions | Manager, Read Only |
| getSubmissionAttachmentBuffer()   | Form Submissions | Manager, Read Only |
| getSubmissionAttachmentMeta()     | Form Submissions | Manager, Read Only |
| getSubmissionAttachmentStream()   | Form Submissions | Manager, Read Only |
| getSubmissionData()               | Form Submissions | Manager, Read Only |
| migrateForm()                     | Form             | Manager            |
| searchForms()                     | Form             | Manager, Read Only |
| searchSubmissions()               | Form Submissions | Manager, Read Only |
| updateForm()                      | Form             | Manager            |
| uploadEmailAttachment()           | FaaS             | Developer          |
| decryptUserToken()                | ---              | ---                |
| encryptUserToken()                | ---              | ---                |
| generateFormElement()             | ---              | ---                |
| generatePageElement()             | ---              | ---                |
| validateForm()                    | ---              | ---                |
| validateFormEvent()               | ---              | ---                |

\* For Private Forms
\*\* For Pre-Fill Data

### Forms App Environments

| Endpoint                     | Permission             | Permission Level   |
| ---------------------------- | ---------------------- | ------------------ |
| createFormsAppEnvironment()  | Forms App Environments | Manager            |
| deleteFormsAppEnvironment()  | Forms App Environments | Manager            |
| getFormsAppEnvironment()     | Forms App Environments | Manager, Read Only |
| searchFormsAppEnvironments() | Forms App Environments | Manager, Read Only |
| updateFormsAppEnvironment()  | Forms App Environments | Manager            |

### Forms Apps

| Endpoint               | Permission                          | Permission Level   |
| ---------------------- | ----------------------------------- | ------------------ |
| createFormsApp()       | Apps                                | Manager            |
|                        | Data Manager, Approvals, Volunteers | Manager            |
| createUser()           | App Users                           | Manager            |
| deleteFormsApp()       | Apps                                | Manager            |
|                        | Data Manager, Approvals, Volunteers | Manager            |
| deleteSendingAddress() | Apps Users                          | Manager            |
| deleteUser()           | App Users                           | Manager            |
| getFormsApp()          | Apps                                | Manager, Read Only |
|                        | Data Manager, Approvals, Volunteers | Manager, Read Only |
| getMyFormsApp()        | ---                                 | ---                |
| getSendingAddress()    | Apps                                | Manager, Read Only |
| setSendingAddress()    | App Users                           | Manager            |
| updateFormsApp()       | Apps                                | Manager            |
|                        | Data Manager, Approvals, Volunteers | Manager            |
| updateStyles()         | App Customisation                   | Manager            |
| verifyJWT()            | ---                                 | ---                |

### Jobs

| Endpoint     | Permission | Permission Level   |
| ------------ | ---------- | ------------------ |
| createJob()  | Jobs       | Manager            |
| deleteJob()  | Jobs       | Manager            |
| searchJobs() | Jobs       | Manager, Read Only |

### Keys

| Endpoint | Permission                                         | Permission Level |
| -------- | -------------------------------------------------- | ---------------- |
| getKey() | Calendar Bookings, Integrations & Development Keys | Manager          |

### Organisations

| Endpoint          | Permission | Permission Level                             |
| ----------------- | ---------- | -------------------------------------------- |
| getOrganisation() | ---        | You need to have a key from the Organisation |
| uploadAsset()     | ---        | You need to have a key from the Organisation |

### PDF

| Endpoint                        | Permission       | Permission Level   |
| ------------------------------- | ---------------- | ------------------ |
| generateFormSubmissionPDF()     | Form Submissions | Manager, Read Only |
| generatePDF()                   | PDF              | Developer          |
| generatePdfFromSubmissionData() | PDF              | Developer          |

### Team Member

| Endpoint           | Permission | Permission Level |
| ------------------ | ---------- | ---------------- |
| getTeamMeberRole() | ---        | ---              |
