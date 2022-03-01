/**
 * @program: dashboard-next
 * @description: Google Sheets
 * @author: Mufeng
 * @date: 2021-06-16 11:18
 **/

import { CustomSelect } from '@/legacy_pages/pages/Integration/views/Settings/views/CustomSelect'
import { MapFields } from '@/legacy_pages/pages/Integration/views/Settings/views/MapFields'
import {
  SettingsProps,
  SettingsWrapper
} from '@/legacy_pages/pages/Integration/views/Settings/views/SettingsWrapper'
import { ThirdPartySignIn } from '@/legacy_pages/pages/Integration/views/Settings/views/ThirdPartySignIn'
import { IntegrationService } from '@/service'
import { useAsyncEffect, useStore } from '@/legacy_pages/utils'
import { FormItem } from '@heyui/component'
import { isNil, isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useParam } from '@/utils'

export const GoogleSheets: FC<SettingsProps> = observer(({ app, onFinish }) => {
  const { formId } = useParam()
  const [authorized, setAuthorized] = useState(false)
  const [drive, setDrive] = useState<string | undefined>()
  const [spreadsheet, setSpreadsheet] = useState<string | undefined>()
  const [worksheet, setWorksheet] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)
  const formStore = useStore('formStore')
  const formFields = formStore.current?.fields || []
  const appId = app!.id
  const [sheetFields, setSheetFields] = useState<string[]>([])

  async function fetchDrives() {
    const result = await IntegrationService.googleDriveList(formId, appId)
    return result
  }

  async function fetchSheets() {
    const result = await IntegrationService.googleSheetsList(formId, appId, drive)
    return result
  }

  async function fetchWorksheets() {
    const result = await IntegrationService.googleSheetsWorksheets(formId, appId, spreadsheet!)
    return result.map((row: string) => ({
      id: row,
      name: row
    }))
  }

  async function fetchFields() {
    const result = await IntegrationService.googleSheetsFields(
      formId,
      appId,
      spreadsheet!,
      worksheet!
    )

    return result.map((row: string, index: number) => ({
      id: index,
      name: row
    }))
  }

  useAsyncEffect(async () => {
    if (isValid(spreadsheet) && isValid(worksheet)) {
      setLoading(true)

      try {
        const sheetFields = await fetchFields()
        setSheetFields(sheetFields)
      } catch (err: any) {
        console.error(err)
      }

      setLoading(false)
    }
  }, [spreadsheet, worksheet])

  async function handleOAuthRequest(code: string) {
    const result = await IntegrationService.googleOauth(formId, appId, code)
    setAuthorized(result)
  }

  function handleValuesChange(changed: any) {
    if (changed.drive) {
      setDrive(changed.drive.id)
    } else if (changed.spreadsheet) {
      setSpreadsheet(changed.spreadsheet.id)
    } else if (changed.worksheet) {
      setWorksheet(changed.worksheet)
    }
  }

  return (
    <SettingsWrapper
      app={app}
      onFinish={onFinish}
      initialValues={{
        fields: [[]]
      }}
      onValuesChange={handleValuesChange}
    >
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
      <FormItem name="spreadsheet" label="Select Spreadsheet" rules={[{ required: true }]}>
        <CustomSelect
          deps={[drive]}
          fetch={fetchSheets}
          labelKey="name"
          tipText="Select a spreadsheet"
          disabled={isNil(drive)}
        />
      </FormItem>
      <FormItem name="worksheet" label="Select Worksheet" rules={[{ required: true }]}>
        <CustomSelect
          deps={[spreadsheet]}
          fetch={fetchWorksheets}
          labelKey="name"
          tipText="Select a worksheet"
          returnObjectValue={false}
          disabled={isNil(spreadsheet)}
        />
      </FormItem>
      <MapFields
        name="fields"
        label="Map fields"
        description="Map HeyForm to Google Sheets fields. If you change a field on Google Sheets, please update it here too, otherwise the integration won't work as expected."
        leftOptions={formFields}
        leftLabelKey="title"
        leftPlaceholder="HeyForm question"
        leftTipText="Select HeyForm question"
        rightLoading={loading}
        rightOptions={sheetFields}
        rightLabelKey="name"
        rightPlaceholder="Google Sheets field"
        rightTipText="Select Google Sheets field"
      />
    </SettingsWrapper>
  )
})
