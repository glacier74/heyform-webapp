/**
 * @program: dashboard-next
 * @description: Google Drive
 * @author: Mufeng
 * @date: 2021-06-16 11:18
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
import { isNil } from '@hpnp/utils/helper'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const GoogleDrive: FC<SettingsProps> = ({ app, onFinish }) => {
  const { formId } = useParam()
  const appId = app!.id
  const [authorized, setAuthorized] = useState(false)
  const [drive, setDrive] = useState<string | undefined>()
  const { t } = useTranslation()

  async function fetchDrives() {
    const result = await IntegrationService.googleDriveList(formId, appId)
    return result
  }

  async function fetchFolders() {
    const result = await IntegrationService.googleDriveFolders(formId, appId, drive)
    return result
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
      <FormItem
        name="drive"
        label={t('integration.selectDrive')}
        description={
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
          tipText="Select a drive"
          disabled={!authorized}
        />
      </FormItem>
      <FormItem
        name="folder"
        label={t('integration.SelectFolder')}
        description={<>{t('integration.GoogleText')}</>}
        rules={[{ required: true }]}
      >
        <CustomSelect
          deps={[drive]}
          fetch={fetchFolders}
          labelKey="name"
          tipText="Select a folder"
          disabled={isNil(drive)}
        />
      </FormItem>
    </SettingsWrapper>
  )
}
