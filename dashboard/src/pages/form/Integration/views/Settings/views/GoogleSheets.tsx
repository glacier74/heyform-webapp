/**
 * @program: dashboard-next
 * @extra: Google Sheets
 * @author: Mufeng
 * @date: 2021-06-16 11:18
 **/
import { Form } from '@heyforms/ui'
import { isNil, isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { IntegrationService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect, useParam } from '@/utils'

import { CustomSelect } from './CustomSelect'
import { MapFields } from './MapFields'
import { SettingsProps, SettingsWrapper } from './SettingsWrapper'
import { ThirdPartySignIn } from './ThirdPartySignIn'

export const GoogleSheets: FC<SettingsProps> = observer(({ app, onFinish }) => {
  const { formId } = useParam()
  const [authorized, setAuthorized] = useState(false)
  const [drive, setDrive] = useState<string | undefined>()
  const [spreadsheet, setSpreadsheet] = useState<string | undefined>()
  const [worksheet, setWorksheet] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)
  const formStore = useStore('formStore')
  const formFields = formStore.fields
  const appId = app!.id
  const [sheetFields, setSheetFields] = useState<string[]>([])
  const { t } = useTranslation()

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
        name="spreadsheet"
        label={t('integration.SelectSpreadsheet')}
        rules={[{ required: true }]}
      >
        <CustomSelect
          deps={[drive]}
          fetch={fetchSheets}
          labelKey="name"
          placeholder="Select a spreadsheet"
          disabled={isNil(drive)}
        />
      </Form.Item>
      <Form.Item
        name="worksheet"
        label={t('integration.SelectWorksheet')}
        rules={[{ required: true }]}
      >
        <CustomSelect
          deps={[spreadsheet]}
          fetch={fetchWorksheets}
          labelKey="name"
          placeholder="Select a worksheet"
          returnObjectValue={false}
          disabled={isNil(spreadsheet)}
        />
      </Form.Item>
      <MapFields
        name="fields"
        label={t('integration.MapFields')}
        extra={t('integration.googleSheet')}
        leftOptions={formFields}
        leftLabelKey="title"
        leftPlaceholder={t('integration.leftPlaceholder')}
        leftTipText={t('integration.leftTipText')}
        rightLoading={loading}
        rightOptions={sheetFields}
        rightLabelKey="name"
        rightPlaceholder={t('integration.rightPlaceholder')}
        rightTipText={t('integration.rightTipText')}
      />
    </SettingsWrapper>
  )
})
