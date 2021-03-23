import generateTenant from '../lib/generate-tenant'
import { TenantConfiguration } from '../lib/types'
import generateForms from './Forms'
import generateFormsApps from './FormsApps'
import generateJobs from './Jobs'
import generateKeys from './Keys'
import generateOrganisations from './Organisations'
import generateTeamMembers from './TeamMembers'
import generatePDF from './PDF'

export default (tenantConfiguration: TenantConfiguration) => {
  const tenant = generateTenant(tenantConfiguration)

  return {
    Forms: generateForms(tenant),
    FormsApps: generateFormsApps(tenant),
    Jobs: generateJobs(tenant),
    Keys: generateKeys(tenant),
    Organisations: generateOrganisations(tenant),
    TeamMembers: generateTeamMembers(tenant),
    PDF: generatePDF(tenant),
  }
}
