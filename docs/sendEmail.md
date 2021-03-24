# OneBlink SDK | Sending Emails

## `sendEmail()`

### Example

```javascript
const OneBlink = require('@oneblink/sdk')

await OneBlink.sendEmail({
  subject: 'Message title',
  html: '<p>HTML version of the message</p>',
  from: {
    address: 'noreply@example.com',
    name: 'No Reply',
  },
  to: ['email@example.com'],
  cc: ['you@example.com'],
  bcc: ['not-you@example.com'],
  attachments: [
    {
      filename: pdfFileName,
      content: pdfData,
      contentType: 'application/pdf',
      encoding: 'binary',
    },
  ],
})
```

### Options

- This function uses the popular [`nodemailer`](https://www.npmjs.com/package/nodemailer) internally to send emails. Please see the documentation for [Message Configuration](https://nodemailer.com/message/) for available options.

### Result (Resolved Promise)

```json
{
  "envelope": {
    "to": ["email@example.com"],
    "from": {
      "address": "noreply@example.com",
      "name": "No Reply"
    }
  },
  "messageId": "<2397812837ec9c23-937ef8a6-fdeb-4ee6-a34a-d39a42213501-000000@AWS_REGION.amazonses.com>",
  "response": "2397812837ec9c23-937ef8a6-fdeb-4ee6-a34a-d39a42213501-000000",
  "raw": "<p>HTML version of the message</p>"
}
```
