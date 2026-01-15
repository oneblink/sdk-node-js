import { ONEBLINK_US } from './lib/tenant-configuration.js'
import generateTenant from './lib/generate-tenant.js'
import OneBlinkAPI from './lib/one-blink-api.js'

const tenant = generateTenant(ONEBLINK_US)
OneBlinkAPI.tenant = tenant
export * from './classes/index.js'
