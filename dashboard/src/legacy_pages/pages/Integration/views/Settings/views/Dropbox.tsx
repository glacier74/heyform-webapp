/**
 * @program: heyform-dashboard
 * @description:
 * @author: mufeng
 * @date: 11/2/21 10:34 AM
 **/

import { CustomSelect } from '@/legacy_pages/pages/Integration/views/Settings/views/CustomSelect'
import {
  SettingsProps,
  SettingsWrapper
} from '@/legacy_pages/pages/Integration/views/Settings/views/SettingsWrapper'
import { ThirdPartySignIn } from '@/legacy_pages/pages/Integration/views/Settings/views/ThirdPartySignIn'
import { IntegrationService } from '@/service'
import { useParam } from '@/utils'
import { FormItem } from '@heyui/component'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Dropbox: FC<SettingsProps> = ({ app, onFinish }) => {
  const { formId } = useParam()
  const appId = app!.id
  const [authorized, setAuthorized] = useState(false)
  const { t } = useTranslation()

  async function fetchFolders() {
    const result = await IntegrationService.dropboxFolders(formId, appId)
    return result
  }

  async function handleOAuthRequest(code: string) {
    const result = await IntegrationService.dropboxOauth(formId, appId, code)
    setAuthorized(result)
  }

  return (
    <SettingsWrapper app={app} onFinish={onFinish}>
      <ThirdPartySignIn app={app} oauthRequest={handleOAuthRequest} />
      <FormItem
        name="folder"
        label={t('integration.select')}
        description={<>{t('integration.DropboxText')}</>}
        rules={[{ required: true }]}
      >
        <CustomSelect
          deps={[authorized]}
          fetch={fetchFolders}
          labelKey="name"
          tipText="Select a folder"
          disabled={!authorized}
        />
      </FormItem>
    </SettingsWrapper>
  )
}
