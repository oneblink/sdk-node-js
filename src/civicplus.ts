import { CIVICPLUS } from './lib/tenant-configuration'
import generateTenant from './lib/generate-tenant'
import OneBlinkAPI from './lib/one-blink-api'

const tenant = generateTenant(CIVICPLUS)
OneBlinkAPI.tenant = tenant
export * from './classes'
