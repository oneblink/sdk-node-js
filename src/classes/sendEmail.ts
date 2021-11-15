import { SES } from 'aws-sdk'
// Have to use nodemailer as aws-sdk can not send attachments
import nodemailer from 'nodemailer'
import OneBlinkAPI from '../lib/one-blink-api'

import { SendMailOptions, SendEmailResult } from '../types'
/**
 * #### Example
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
 * #### Options
 *
 * This function uses the popular
 * [`nodemailer`](https://www.npmjs.com/package/nodemailer) internally to send
 * emails. Please see the documentation for [Message
 * Configuration](https://nodemailer.com/message/) for available options.
 */
export default async function sendEmail(
  options: SendMailOptions,
): Promise<SendEmailResult> {
  const transporter = nodemailer.createTransport({
    SES: new SES({ region: OneBlinkAPI.tenant.awsRegion }),
  })

  const result = await transporter.sendMail(options)
  // @ts-expect-error Provided type is bad
  return result
}
