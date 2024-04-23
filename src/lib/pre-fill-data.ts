import { OneBlinkUploader } from '@oneblink/storage'

export default async function setPreFillData(
  oneBlinkUploader: OneBlinkUploader,
  { formId, prefillData }: Parameters<OneBlinkUploader['uploadPrefillData']>[0],
): Promise<ReturnType<OneBlinkUploader['uploadPrefillData']>> {
  return await oneBlinkUploader.uploadPrefillData({
    formId,
    prefillData,
  })
}
