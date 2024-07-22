import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'
// Have to use nodemailer as aws-sdk can not send attachments
import MailComposer from 'nodemailer/lib/mail-composer'
import OneBlinkAPI from '../lib/one-blink-api'

import { SendMailOptions, SendEmailResult } from '../types'
/**
 * ## Example
 *
 * ```javascript
 * const OneBlink = require('@oneblink/sdk')
 *
 * await OneBlink.sendEmail({
 *   subject: 'Message title',
 *   html: '<p>HTML version of the message</p>',
 *   from: {
 *     address: 'noreply@example.com',
 *     name: 'No Reply',
 *   },
 *   to: ['email@example.com'],
 *   cc: ['you@example.com'],
 *   bcc: ['not-you@example.com'],
 *   attachments: [
 *     {
 *       filename: pdfFileName,
 *       content: pdfData,
 *       contentType: 'application/pdf',
 *       encoding: 'binary',
 *     },
 *   ],
 * })
 * ```
 *
 * ## Options
 *
 * This function uses the popular
 * [`nodemailer`](https://www.npmjs.com/package/nodemailer) internally to send
 * emails. Please see the documentation for [Message
 * Configuration](https://nodemailer.com/message/) for available options.
 *
 * @returns
 *
 *   ## Role Permissions Required
 *
 *   In AWS, you will require an IAM Role associated with the email used that has
 *   the permissions in order to use this function:
 *
 *   - SendEmail
 *   - SendRawEmail
 */
export default async function sendEmail(
  options: SendMailOptions,
): Promise<SendEmailResult> {
  const mailComposer = new MailComposer(options)
  const mimeNode = mailComposer.compile()
  //@ts-expect-error This exists but not on the type. Additionally, this
  //needs to be included so that the BCC won't be stripped from the email.
  //Link to related docs: https://nodemailer.com/extras/mailcomposer/#bcc
  mimeNode.keepBcc = true
  const rawMailData = await mimeNode.build()

  const sesv2Client = new SESv2Client({
    region: OneBlinkAPI.tenant.awsRegion,
  })
  const sendEmailCommandOutput = await sesv2Client.send(
    new SendEmailCommand({
      Content: {
        Raw: {
          Data: rawMailData,
        },
      },
    }),
  )
  return sendEmailCommandOutput
}
