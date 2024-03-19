/**
 * @program: dashboard-next
 * @description: Google Drive
 * @author: Mufeng
 * @date: 2021-06-16 11:18
 **/
import { Form } from '@heyforms/ui'
import { isNil } from '@hpnp/utils/helper'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { IntegrationService } from '@/service'
import { useParam } from '@/utils'

import { CustomSelect } from './CustomSelect'
import { SettingsProps, SettingsWrapper } from './SettingsWrapper'
import { ThirdPartySignIn } from './ThirdPartySignIn'

export const GoogleDrive: FC<SettingsProps> = ({ app, onFinish }) => {
  const { formId } = useParam()
  const appId = app!.id
  const [authorized, setAuthorized] = useState(false)
  const [drive, setDrive] = useState<string | undefined>()
  const { t } = useTranslation()

  async function fetchDrives() {
    return await IntegrationService.googleDriveList(formId, appId)
  }

  async function fetchFolders() {
    return await IntegrationService.googleDriveFolders(formId, appId, drive)
  }

  async function handleOAuthRequest(code: string) {
    const result = await IntegrationService.googleOauth(formId, appId, code)
    setAuthorized(result)
  }

  function handleValuesChange(changed: any) {
    if (changed.drive) {
      setDrive(changed.drive.id)
    }
  }

  return (
    <SettingsWrapper app={app} onFinish={onFinish} onValuesChange={handleValuesChange}>
      <ThirdPartySignIn app={app} oauthRequest={handleOAuthRequest} />
      <Form.Item
        name="drive"
        label={t('integration.selectDrive')}
        extra={
          <>
            {t('integration.selectGoogleDrive')}{' '}
            <a href="https://support.google.com/a/users/answer/9310351">
              {t('integration.GoogleSharedDrives')}
            </a>{' '}
            {t('integration.with')}
          </>
        }
        rules={[{ required: true }]}
      >
        <CustomSelect
          deps={[authorized]}
          fetch={fetchDrives}
          labelKey="name"
          placeholder="Select a drive"
          disabled={!authorized}
        />
      </Form.Item>
      <Form.Item
        name="folder"
        label={t('integration.SelectFolder')}
        extra={<>{t('integration.GoogleText')}</>}
        rules={[{ required: true }]}
      >
        <CustomSelect
          deps={[drive]}
          fetch={fetchFolders}
          labelKey="name"
          placeholder="Select a folder"
          disabled={isNil(drive)}
        />
      </Form.Item>
    </SettingsWrapper>
  )
}
