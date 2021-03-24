import generateClasses, { SendEmailOptions, SendEmailResult } from './classes'
import { CIVICPLUS } from './lib/tenant-configuration'

const {
  Forms,
  FormsApps,
  Jobs,
  Keys,
  Organisations,
  TeamMembers,
  PDF,
  sendEmail,
} = generateClasses(CIVICPLUS)

export {
  Forms,
  FormsApps,
  Jobs,
  Keys,
  Organisations,
  TeamMembers,
  PDF,
  sendEmail,
  SendEmailOptions,
  SendEmailResult,
}
