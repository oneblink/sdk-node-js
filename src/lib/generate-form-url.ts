import querystring from 'querystring'

export default function generateFormUrl({
  formId,
  token,
  externalId,
  preFillFormDataId,
  endpoint,
  userToken,
  previousFormSubmissionApprovalId,
}: {
  endpoint: string
  formId: number
  token: string
  externalId?: unknown
  preFillFormDataId?: string
  userToken?: string
  previousFormSubmissionApprovalId?: string
}): string {
  if (!formId) {
    throw new Error(
      'no form id provided, please provide a form id to generate a url',
    )
  }
  let searchParams = {
    access_key: token,
  }
  if (externalId) {
    searchParams = Object.assign({}, searchParams, { externalId })
  }
  if (preFillFormDataId) {
    searchParams = Object.assign({}, searchParams, { preFillFormDataId })
  }
  if (userToken) {
    searchParams = Object.assign({}, searchParams, { userToken })
  }
  if (previousFormSubmissionApprovalId) {
    searchParams = Object.assign({}, searchParams, {
      previousFormSubmissionApprovalId,
    })
  }
  const search = querystring.stringify(searchParams)

  return `${endpoint}/${formId}?${search}`
}
