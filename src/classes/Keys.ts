import { KeyTypes } from '@oneblink/types'
import OneBlinkAPI from '../lib/one-blink-api'
import { ConstructorOptions, Tenant } from '../lib/types'

export default (tenant: Tenant) =>
  class Keys extends OneBlinkAPI {
    constructor(options: ConstructorOptions) {
      options = options || {}
      super(options.accessKey, options.secretKey, tenant)
    }

    getKey(keyId?: unknown): Promise<KeyTypes.Key> {
      if (typeof keyId !== 'string') {
        return Promise.reject(new TypeError('Must supply "keyId" as a string'))
      }

      return super.getRequest(`/keys/${keyId}`)
    }
  }
