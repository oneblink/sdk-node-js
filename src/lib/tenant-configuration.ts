import { TenantConfiguration } from '../types'

export const ONEBLINK: TenantConfiguration = {
  awsRegion: 'ap-southeast-2',
  test: {
    jwtIssuer:
      'https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_E03xBaafT',
    apiOrigin: 'https://auth-api-test.blinkm.io',
    pdfOrigin: 'https://pdf-test.blinkm.io',
    consoleOrigin: 'https://console-test.oneblink.io',
    formatCurrency: new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format,
    formatNumber: new Intl.NumberFormat('en-AU', {
      style: 'decimal',
    }).format,
  },
  prod: {
    jwtIssuer:
      'https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_o1t3ntGWx',
    apiOrigin: 'https://auth-api.blinkm.io',
    pdfOrigin: 'https://pdf.blinkm.io',
    consoleOrigin: 'https://console.oneblink.io',
    formatCurrency: new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format,
    formatNumber: new Intl.NumberFormat('en-AU', {
      style: 'decimal',
    }).format,
  },
}

export const CIVICPLUS: TenantConfiguration = {
  awsRegion: 'us-east-2',
  test: {
    jwtIssuer:
      'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_e2gd0LSVp',
    apiOrigin: 'https://auth-api-test.transform.civicplus.com',
    pdfOrigin: 'https://pdf-test.transform.civicplus.com',
    consoleOrigin: 'https://console-test.transform.civicplus.com',
    formatCurrency: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format,
    formatNumber: new Intl.NumberFormat('en-US', {
      style: 'decimal',
    }).format,
  },
  prod: {
    jwtIssuer:
      'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_A92OPccYd',
    apiOrigin: 'https://auth-api.transform.civicplus.com',
    pdfOrigin: 'https://pdf.transform.civicplus.com',
    consoleOrigin: 'https://console.transform.civicplus.com',
    formatCurrency: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format,
    formatNumber: new Intl.NumberFormat('en-US', {
      style: 'decimal',
    }).format,
  },
}
