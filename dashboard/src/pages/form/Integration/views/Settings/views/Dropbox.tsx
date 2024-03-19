/**
 * @program: heyform-dashboard
 * @description:
 * @author: mufeng
 * @date: 11/2/21 10:34 AM
 **/
import { Form } from '@heyforms/ui'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { IntegrationService } from '@/service'
import { useParam } from '@/utils'

import { CustomSelect } from './CustomSelect'
import { SettingsProps, SettingsWrapper } from './SettingsWrapper'
import { ThirdPartySignIn } from './ThirdPartySignIn'

export const Dropbox: FC<SettingsProps> = ({ app, onFinish }) => {
  const { formId } = useParam()
  const appId = app!.id
  const [authorized, setAuthorized] = useState(false)
  const { t } = useTranslation()

  async function fetchFolders() {
    return await IntegrationService.dropboxFolders(formId, appId)
  }

  async function handleOAuthRequest(code: string) {
    const result = await IntegrationService.dropboxOauth(formId, appId, code)
    setAuthorized(result)
  }

  return (
    <SettingsWrapper app={app} onFinish={onFinish}>
      <ThirdPartySignIn app={app} oauthRequest={handleOAuthRequest} />
      <Form.Item
        name="folder"
        label={t('integration.select')}
        extra={<>{t('integration.DropboxText')}</>}
        rules={[{ required: true }]}
      >
        <CustomSelect
          deps={[authorized]}
          fetch={fetchFolders}
          labelKey="name"
          placeholder="Select a folder"
          disabled={!authorized}
        />
      </Form.Item>
    </SettingsWrapper>
  )
}
