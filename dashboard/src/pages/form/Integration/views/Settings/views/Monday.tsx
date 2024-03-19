/**
 * @program: dashboard-next
 * @description: Monday
 * @author: Mufeng
 * @date: 2021-06-30 09:30
 **/
import { Form, Select } from '@heyforms/ui'
import { isValid } from '@hpnp/utils/helper'
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

export const Monday: FC<SettingsProps> = observer(({ app, onFinish }) => {
  const { formId } = useParam()
  const appId = app!.id
  const [authorized, setAuthorized] = useState(false)
  const [board, setBoard] = useState<number | string | undefined>()
  const [loading, setLoading] = useState(false)
  const [rightFields, setRightFields] = useState<string[]>([])
  const formStore = useStore('formStore')
  const formFields = formStore.fields
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
      <ThirdPartySignIn app={app} oauthRequest={handleOAuthRequest} />
      <Form.Item name="board" label={t('integration.Board')} rules={[{ required: true }]}>
        <CustomSelect
          deps={[authorized]}
          fetch={fetchBoards}
          labelKey="name"
          placeholder={t('integration.SelectBoard')}
          disabled={!authorized}
        />
      </Form.Item>
      <Form.Item name="group" label={t('integration.Group')}>
        <CustomSelect
          deps={[board]}
          fetch={fetchGroups}
          labelKey="title"
          placeholder={t('integration.SelectBoard')}
          disabled={!board}
        />
      </Form.Item>
      <Form.Item name="itemName" label={t('integration.ItemName')} rules={[{ required: true }]}>
        <Select options={formFields as any} labelKey="title" />
      </Form.Item>
      <MapFields
        name="fields"
        required={false}
        label={t('integration.ColumnValues')}
        extra={t('integration.mondayText')}
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
