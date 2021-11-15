import { ONEBLINK } from './lib/tenant-configuration'
import generateTenant from './lib/generate-tenant'
import OneBlinkAPI from './lib/one-blink-api'

const tenant = generateTenant(ONEBLINK)
OneBlinkAPI.tenant = tenant
export * from './classes'
