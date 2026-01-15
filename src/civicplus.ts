import { CIVICPLUS } from './lib/tenant-configuration.js'
import generateTenant from './lib/generate-tenant.js'
import OneBlinkAPI from './lib/one-blink-api.js'

const tenant = generateTenant(CIVICPLUS)
OneBlinkAPI.tenant = tenant
export * from './classes/index.js'
