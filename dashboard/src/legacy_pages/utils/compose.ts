import { WorkspaceModel } from '@/legacy_pages/models'
import { isValid } from '@hpnp/utils/helper'
import isFQDN from 'validator/lib/isFQDN'

export function formSharingLinkUrl(workspace?: WorkspaceModel, formId?: string) {
  let urlPrefix = import.meta.env.VITE_HOMEPAGE

  if (
    workspace?.plan?.customDomain &&
    workspace?.enableCustomDomain &&
    isValid(workspace?.customDomain) &&
    isFQDN(workspace!.customDomain!)
  ) {
    urlPrefix = `https://${workspace!.customDomain}`
  }

  return urlPrefix + `/f/${formId}`
}
