import { afterEach, describe, expect, test, vi } from 'vitest'
import { Approvals, Forms } from '../src/oneblink.js'

const submissionId = 'f1eadc2b-79c8-4f97-8d92-cde64b34911f'
const approvalId = 'aaaaaaaa-bbbb-4543-cccc-addddd543454'

function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })
}

describe('payment retrieval', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  test('Forms requests the successful submission payment', async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ type: 'CP_PAY' }))
    vi.stubGlobal('fetch', fetchMock)
    const forms = new Forms({ accessKey: 'key', secretKey: 'secret' })

    await forms.getCPPayPayment(submissionId)
    await forms.getNSWGovPayPayment(submissionId)
    await forms.getStripePayment(submissionId)

    expect(String(fetchMock.mock.calls[0][0])).toContain(
      `/form-submission-meta/${submissionId}/payments/cp-pay`,
    )
    expect(String(fetchMock.mock.calls[1][0])).toContain(
      `/form-submission-meta/${submissionId}/payments/nsw-gov-pay`,
    )
    expect(String(fetchMock.mock.calls[2][0])).toContain(
      `/form-submission-meta/${submissionId}/payments/stripe`,
    )
  })

  test('Forms rejects a missing submission id', async () => {
    const forms = new Forms({ accessKey: 'key', secretKey: 'secret' })

    await expect(forms.getCPPayPayment('')).rejects.toThrow(
      'Must supply "submissionId" as a string',
    )
    await expect(forms.getNSWGovPayPayment('')).rejects.toThrow(
      'Must supply "submissionId" as a string',
    )
    await expect(forms.getStripePayment('')).rejects.toThrow(
      'Must supply "submissionId" as a string',
    )
  })

  test('Approvals requests the successful approval payment', async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ type: 'NSW_GOV_PAY' }))
    vi.stubGlobal('fetch', fetchMock)
    const approvals = new Approvals({ accessKey: 'key', secretKey: 'secret' })

    await approvals.getCPPayPayment(approvalId)
    await approvals.getNSWGovPayPayment(approvalId)
    await approvals.getStripePayment(approvalId)

    expect(String(fetchMock.mock.calls[0][0])).toContain(
      `/form-submission-approvals/${approvalId}/payments/cp-pay`,
    )
    expect(String(fetchMock.mock.calls[1][0])).toContain(
      `/form-submission-approvals/${approvalId}/payments/nsw-gov-pay`,
    )
    expect(String(fetchMock.mock.calls[2][0])).toContain(
      `/form-submission-approvals/${approvalId}/payments/stripe`,
    )
  })

  test('Approvals rejects a missing approval id', async () => {
    const approvals = new Approvals({ accessKey: 'key', secretKey: 'secret' })

    await expect(approvals.getCPPayPayment('')).rejects.toThrow(
      '"id" must be a string and is required',
    )
    await expect(approvals.getNSWGovPayPayment('')).rejects.toThrow(
      '"id" must be a string and is required',
    )
    await expect(approvals.getStripePayment('')).rejects.toThrow(
      '"id" must be a string and is required',
    )
  })
})
