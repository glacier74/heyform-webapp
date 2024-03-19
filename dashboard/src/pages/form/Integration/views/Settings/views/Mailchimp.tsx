/**
 * @program: dashboard-next
 * @description: Mailchimp
 * @author: Mufeng
 * @date: 2021-06-16 11:18
 **/
import { Form, Select } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { IntegrationService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'

import { CustomSelect } from './CustomSelect'
import { SettingsProps, SettingsWrapper } from './SettingsWrapper'
import { ThirdPartySignIn } from './ThirdPartySignIn'

export const Mailchimp: FC<SettingsProps> = observer(({ app, onFinish }) => {
  const { formId } = useParam()
  const appId = app!.id
  const [authorized, setAuthorized] = useState(false)
  const formStore = useStore('formStore')
  const fields = formStore.fields
  const { t } = useTranslation()

  async function fetchAudiences() {
    return await IntegrationService.mailchimpAudiences(formId, appId)
  }

  async function handleOAuthRequest(code: string) {
    const result = await IntegrationService.mailchimpOauth(formId, appId, code)
    setAuthorized(result)
  }

  return (
    <SettingsWrapper app={app} onFinish={onFinish}>
      <ThirdPartySignIn app={app} oauthRequest={handleOAuthRequest} />
      <Form.Item
        name="audience"
        label={t('integration.SelectAudience')}
        rules={[{ required: true }]}
      >
        <CustomSelect
          deps={[authorized]}
          fetch={fetchAudiences}
          labelKey="name"
          placeholder={t('integration.selectQuestion')}
          disabled={!authorized}
        />
      </Form.Item>
      <Form.Item name="email" label={t('integration.SubscriberEmail')} rules={[{ required: true }]}>
        <Select
          options={fields as any}
          labelKey="title"
          placeholder={t('integration.selectQuestion')}
        />
      </Form.Item>
      <Form.Item
        name="fullName"
        label={t('audiences.contact.addContact.fullName')}
        rules={[{ required: false }]}
      >
        <Select
          options={fields as any}
          labelKey="title"
          placeholder={t('integration.selectQuestion')}
        />
      </Form.Item>
      <Form.Item name="address" label={t('integration.Address')} rules={[{ required: false }]}>
        <Select
          options={fields as any}
          labelKey="title"
          placeholder={t('integration.selectQuestion')}
        />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label={t('audiences.contact.addContact.phoneNumber')}
        rules={[{ required: false }]}
      >
        <Select
          options={fields as any}
          labelKey="title"
          placeholder={t('integration.selectQuestion')}
        />
      </Form.Item>
    </SettingsWrapper>
  )
})
