import { ONEBLINK } from './lib/tenant-configuration'
import generateTenant from './lib/generate-tenant'
// Classes
import Forms from './classes/Forms'
import FormsApps from './classes/FormsApps'
import Jobs from './classes/Jobs'
import Keys from './classes/Keys'
import Organisations from './classes/Organisations'
import TeamMembers from './classes/TeamMembers'
import PDF from './classes/PDF'
import Approvals from './classes/Approvals'
import FormsAppEnvironments from './classes/FormsAppEnvironments'
import EmailTemplates from './classes/EmailTemplates'

// Functions
import generateSendEmail, {
  SendEmailOptions,
  SendEmailResult,
} from './classes/sendEmail'

const tenant = generateTenant(ONEBLINK)

Forms.tenant = tenant
FormsApps.tenant = tenant
Jobs.tenant = tenant
Keys.tenant = tenant
Organisations.tenant = tenant
TeamMembers.tenant
PDF.tenant = tenant
Approvals.tenant = tenant
FormsAppEnvironments.tenant = tenant
EmailTemplates.tenant = tenant

const sendEmail = generateSendEmail(tenant)
export {
  Forms,
  FormsApps,
  Jobs,
  Keys,
  Organisations,
  TeamMembers,
  PDF,
  Approvals,
  FormsAppEnvironments,
  EmailTemplates,
  sendEmail,
  SendEmailOptions,
  SendEmailResult,
}
