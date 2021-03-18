import jwksClient from 'jwks-rsa'

export type ConstructorOptions = {
  accessKey: unknown
  secretKey: unknown
}

export type AWSCredentials = {
  AccessKeyId: string
  SecretAccessKey: string
  SessionToken: string
}

export type FormRetrievalData = {
  credentials: AWSCredentials
  s3: {
    bucket: string
    key: string
    region: string
  }
}

export type PreFillMeta = {
  preFillFormDataId: string
  credentials: AWSCredentials
  s3: {
    bucket: string
    key: string
    region: string
  }
}

export type BaseSearchResult = {
  meta: {
    limit: null
    offset: null
    nextOffset: null
  }
}

export type TenantConfiguration = {
  test: {
    apiOrigin: string
    jwtIssuer: string
  }
  prod: {
    apiOrigin: string
    jwtIssuer: string
  }
}

export type Tenant = {
  apiOrigin: string
  jwtIssuer: string
  jwksInstance: jwksClient.JwksClient
}
