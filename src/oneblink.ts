import generateClasses, { SendEmailOptions, SendEmailResult } from './classes'
import { ONEBLINK } from './lib/tenant-configuration'

const {
  Forms,
  FormsApps,
  Jobs,
  Keys,
  Organisations,
  TeamMembers,
  PDF,
  sendEmail,
  Approvals,
} = generateClasses(ONEBLINK)

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
  Approvals,
}
