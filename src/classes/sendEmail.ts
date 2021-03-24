import { SES } from 'aws-sdk'
// Have to use nodemailer as aws-sdk can not send attachments
import nodemailer, { SentMessageInfo, SendMailOptions } from 'nodemailer'

import { Tenant } from '../lib/types'

export type SendEmailOptions = SendMailOptions & {
  awsRegion?: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (tenant: Tenant) =>
  async function sendEmail({
    awsRegion,
    ...options
  }: SendEmailOptions): Promise<SentMessageInfo> {
    const transporter = nodemailer.createTransport({
      SES: new SES({ region: awsRegion || tenant.awsRegion }),
    })
    return await transporter.sendMail(options)
  }
