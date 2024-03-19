/**
 * @program: dashboard-next
 * @description: Hubspot
 * @author: Mufeng
 * @date: 2021-06-29 11:18
 **/
import { Form, Select } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { IntegrationService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'

import { SettingsProps, SettingsWrapper } from './SettingsWrapper'
import { ThirdPartySignIn } from './ThirdPartySignIn'

export const Hubspot: FC<SettingsProps> = observer(({ app, onFinish }) => {
  const { formId } = useParam()
  const appId = app!.id
  const [authorized, setAuthorized] = useState(false)
  const formStore = useStore('formStore')
  const formFields = formStore.fields
  const { t } = useTranslation()

  async function handleOAuthRequest(code: string) {
    const result = await IntegrationService.hubspotOauth(formId, appId, code)
    setAuthorized(result)
  }

  return (
    <SettingsWrapper app={app} onFinish={onFinish}>
      <ThirdPartySignIn app={app} oauthRequest={handleOAuthRequest} />
      <Form.Item
        name="fullname"
        label={t('audiences.contact.addContact.fullName')}
        rules={[{ required: true }]}
      >
        <Select
          options={formFields as any}
          labelKey="title"
          placeholder={t('integration.selectQuestion')}
          disabled={!authorized}
        />
      </Form.Item>
      <Form.Item name="email" label={t('login.Email')} rules={[{ required: true }]}>
        <Select
          options={formFields as any}
          labelKey="title"
          placeholder={t('integration.selectQuestion')}
          disabled={!authorized}
        />
      </Form.Item>
      <Form.Item name="phone" label={t('integration.PhoneNumber')}>
        <Select
          options={formFields as any}
          labelKey="title"
          placeholder={t('integration.selectQuestion')}
          disabled={!authorized}
        />
      </Form.Item>
      <Form.Item name="jobtitle" label={t('integration.JobTitle')}>
        <Select
          options={formFields as any}
          labelKey="title"
          placeholder={t('integration.selectQuestion')}
          disabled={!authorized}
        />
      </Form.Item>
    </SettingsWrapper>
  )
})
