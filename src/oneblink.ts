import generateClasses from './classes'
import { ONEBLINK } from './lib/tenant-configuration'

const {
  Forms,
  FormsApps,
  Jobs,
  Keys,
  Organisations,
  TeamMembers,
  PDF,
} = generateClasses(ONEBLINK)

export { Forms, FormsApps, Jobs, Keys, Organisations, TeamMembers, PDF }
