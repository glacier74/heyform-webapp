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
import { FormItem } from '@heyui/component'
import { isNil } from '@hpnp/utils/helper'
import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useParam } from '@/utils'

export const GoogleDrive: FC<SettingsProps> = ({ app, onFinish }) => {
  const { formId } = useParam()
  const appId = app!.id
  const [authorized, setAuthorized] = useState(false)
  const [drive, setDrive] = useState<string | undefined>()

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
        label="Select Drive"
        description={
          <>
            You can select your own Google Drive or{' '}
            <a href="https://support.google.com/a/users/answer/9310351">Google Shared Drives</a>{' '}
            which you are connected with.
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
        label="Select Folder"
        description={
          <>Folder where to place file if you have added a "File Upload" component in your form.</>
        }
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
