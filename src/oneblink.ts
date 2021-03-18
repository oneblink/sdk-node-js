import generateClasses from './classes'
import { ONEBLINK } from './lib/tenant-configuration'

const {
  Forms,
  FormsApps,
  Jobs,
  Keys,
  Organisations,
  TeamMembers,
} = generateClasses(ONEBLINK)

export { Forms, FormsApps, Jobs, Keys, Organisations, TeamMembers }
