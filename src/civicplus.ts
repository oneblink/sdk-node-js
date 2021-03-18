import generateClasses from './classes'
import { CIVICPLUS } from './lib/tenant-configuration'

const {
  Forms,
  FormsApps,
  Jobs,
  Keys,
  Organisations,
  TeamMembers,
} = generateClasses(CIVICPLUS)

export { Forms, FormsApps, Jobs, Keys, Organisations, TeamMembers }
