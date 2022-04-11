/**
 * @program: dashboard-next
 * @description: Monday
 * @author: Mufeng
 * @date: 2021-06-30 09:30
 **/

import { CustomSelect } from '@/legacy_pages/pages/Integration/views/Settings/views/CustomSelect'
import { MapFields } from '@/legacy_pages/pages/Integration/views/Settings/views/MapFields'
import { SettingsProps, SettingsWrapper } from '@/legacy_pages/pages/Integration/views/Settings/views/SettingsWrapper'
import { ThirdPartySignIn } from '@/legacy_pages/pages/Integration/views/Settings/views/ThirdPartySignIn'
import { useAsyncEffect, useStore } from '@/legacy_pages/utils'
import { IntegrationService } from '@/service'
import { useParam } from '@/utils'
import { FormItem, Select } from '@heyui/component'
import { isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Monday: FC<SettingsProps> = observer(({ app, onFinish }) => {
  const { formId } = useParam()
  const appId = app!.id
  const [authorized, setAuthorized] = useState(false)
  const [board, setBoard] = useState<number | string | undefined>()
  const [loading, setLoading] = useState(false)
  const [rightFields, setRightFields] = useState<string[]>([])
  const formStore = useStore('formStore')
  const formFields = formStore.current?.fields || []
  const { t } = useTranslation()

  async function fetchBoards() {
    const result = await IntegrationService.mondayBoards(formId, appId)
    return result
  }

  async function fetchGroups() {
    const result = await IntegrationService.mondayGroups(formId, appId, board!)
    return result
  }

  async function handleOAuthRequest(code: string) {
    const result = await IntegrationService.mondayOauth(formId, appId, code)
    setAuthorized(result)
  }

  function handleValuesChange(changed: any) {
    if (changed.board) {
      setBoard(changed.board.id)
    }
  }

  useAsyncEffect(async () => {
    if (isValid(board)) {
      setLoading(true)

      try {
        const result = await IntegrationService.mondayFields(formId, appId, board!)
        setRightFields(result.filter((row: any) => row.type === 'text'))
      } catch (err: any) {
        console.error(err)
      }

      setLoading(false)
    }
  }, [board])

  return (
    <SettingsWrapper
      app={app}
      onFinish={onFinish}
      initialValues={{
        fields: [[]]
      }}
      onValuesChange={handleValuesChange}
    >
      <ThirdPartySignIn app={app} oauthRequest={handleOAuthRequest}/>
      <FormItem name="board" label={t('integration.Board')} rules={[{ required: true }]}>
        <CustomSelect
          deps={[authorized]}
          fetch={fetchBoards}
          labelKey="name"
          tipText={t('integration.SelectBoard')}
          disabled={!authorized}
        />
      </FormItem>
      <FormItem name="group" label={t('integration.Group')}>
        <CustomSelect
          deps={[board]}
          fetch={fetchGroups}
          labelKey="title"
          tipText={t('integration.SelectBoard')}
          disabled={!board}
        />
      </FormItem>
      <FormItem name="itemName" label={t('integration.ItemName')} rules={[{ required: true }]}>
        <Select options={formFields as any} labelKey="title"/>
      </FormItem>
      <MapFields
        name="fields"
        required={false}
        label={t('integration.ColumnValues')}
        description={t('integration.mondayText')}
        leftOptions={formFields}
        leftLabelKey="title"
        leftPlaceholder="HeyForm question"
        leftTipText={t('integration.leftTipText')}
        rightLoading={loading}
        rightOptions={rightFields}
        rightLabelKey="title"
        rightPlaceholder="Monday column"
        rightTipText={t('integration.mondayColumn')}
      />
    </SettingsWrapper>
  )
})
