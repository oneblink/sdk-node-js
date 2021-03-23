import jwksClient from 'jwks-rsa'

export type ConstructorOptions = {
  accessKey: string
  secretKey: string
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

export type PreFillMeta = FormRetrievalData & {
  preFillFormDataId: string
}

export type BaseSearchResult = {
  meta: {
    limit: null
    offset: null
    nextOffset: null
  }
}

type TenantBase = {
  apiOrigin: string
  pdfOrigin: string
  jwtIssuer: string
}

export type TenantConfiguration = {
  test: TenantBase
  prod: TenantBase
}

export type Tenant = TenantBase & {
  jwksInstance: jwksClient.JwksClient
}
