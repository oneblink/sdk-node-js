// @flow

type FormsAppBaseMenuItem = {
  label: string,
  icon: string,
}

declare type FormsAppScreenMenuItem = FormsAppBaseMenuItem & {
  type: 'FORMS_LIST' | 'JOBS' | 'DRAFTS' | 'PENDING_SUBMISSIONS' | 'PROFILE',
  isHidden: boolean,
  isDefault: boolean,
}

declare type FormsAppHrefMenuItem = FormsAppBaseMenuItem & {
  type: 'HREF',
  href: string,
}

declare type FormsAppMenuItem = FormsAppHrefMenuItem | FormsAppScreenMenuItem

declare type FormsAppStyles = {
  foregroundColour?: ?string,
  highlightColour?: ?string,
  contrastColour?: ?string,
  logoUrl?: ?string,
  customCss?: ?string,
  menuItems: FormsAppMenuItem[],
}

declare type FormsAppHostnameConfiguration = {
  formsAppId: number,
  createdAt: string,
  updatedAt: string,
  route53: {
    hostedZoneId: string,
    hostedZoneNameServers: string[],
  },
  acm: {
    certificateArn: string,
    dnsValidation: {
      name: string,
      type: string,
      value: string,
    },
  },
  cloudFront: null | {
    distributionId: string,
    distributionDomain: string,
  },
  errorMessage: null | string,
}

declare type NewFormsApp = {
  name: string,
  hostname: string,
  organisationId: string,
  formsAppEnvironmentId: number,
  styles: FormsAppStyles,
  formIds: number[],
  pwaSettings: ?{
    homeScreenIconUrl?: string,
    homeScreenName?: string,
    splashScreenName?: string,
  },
  slug: string,
}

declare type FormsApp = NewFormsApp & {
  id: number,
  oAuthClientId: string,
  createdAt: string,
  updatedAt: string,
  notificationEmailAddresses: string[],
}

declare type FormsAppUrl = {
  full: string,
  prefix: string,
  subDomain: string,
  suffix: string,
  customDomain: string,
  customPrefix: string,
  isCustom: boolean,
}

declare type FormsAppSendingAddress = {
  formsAppId: number,
  emailAddress: string,
  createdAt: string,
  updatedAt: string,
  sesVerificationAttributes: {
    VerificationStatus: string,
  },
}

// Forms App Environments

declare type NewFormsAppEnvironment = {
  name: string,
  description: ?string,
  slug: string,
  organisationId: string,
}

declare type FormsAppEnvironment = NewFormsAppEnvironment & {
  id: number,
  createdAt: string,
  updatedAt: string,
}
