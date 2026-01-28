import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'
// Have to use nodemailer as aws-sdk can not send attachments
import MailComposer from 'nodemailer/lib/mail-composer/index.js'
import OneBlinkAPI from '../lib/one-blink-api.js'

import { SendMailOptions, SendEmailResult } from '../types.js'
/**
 * **Permissions**
 *
 * In AWS, you will require an IAM Role associated with the email used that has
 * the permissions in order to use this function:
 *
 * - `SendEmail`
 * - `SendRawEmail`
 *
 * @example
 *   import * as OneBlink from '@oneblink/sdk'
 *
 *   await OneBlink.sendEmail({
 *     subject: 'Message title',
 *     html: '<p>HTML version of the message</p>',
 *     from: {
 *       address: 'noreply@example.com',
 *       name: 'No Reply',
 *     },
 *     to: ['email@example.com'],
 *     cc: ['you@example.com'],
 *     bcc: ['not-you@example.com'],
 *     attachments: [
 *       {
 *         filename: pdfFileName,
 *         content: pdfData,
 *         contentType: 'application/pdf',
 *         encoding: 'binary',
 *       },
 *     ],
 *   })
 *
 * @param options This function uses the popular
 *   [`nodemailer`](https://www.npmjs.com/package/nodemailer) internally to send
 *   emails. Please see the documentation for [Message
 *   Configuration](https://nodemailer.com/message/) for available options.
 * @returns
 */
export default async function sendEmail(
  options: SendMailOptions,
): Promise<SendEmailResult> {
  const mailComposer = new MailComposer(options)
  const mimeNode = mailComposer.compile()
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
