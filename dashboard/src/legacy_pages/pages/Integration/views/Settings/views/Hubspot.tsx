/**
 * @program: dashboard-next
 * @description: Hubspot
 * @author: Mufeng
 * @date: 2021-06-29 11:18
 **/

import { SettingsProps, SettingsWrapper } from '@/legacy_pages/pages/Integration/views/Settings/views/SettingsWrapper'
import { ThirdPartySignIn } from '@/legacy_pages/pages/Integration/views/Settings/views/ThirdPartySignIn'
import { useStore } from '@/legacy_pages/utils'
import { IntegrationService } from '@/service'
import { useParam } from '@/utils'
import { FormItem, Select } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Hubspot: FC<SettingsProps> = observer(({ app, onFinish }) => {
  const { formId } = useParam()
  const appId = app!.id
  const [authorized, setAuthorized] = useState(false)
  const formStore = useStore('formStore')
  const formFields = formStore.current?.fields || []
  const { t } = useTranslation()

  async function handleOAuthRequest(code: string) {
    const result = await IntegrationService.hubspotOauth(formId, appId, code)
    setAuthorized(result)
  }

  return (
    <SettingsWrapper app={app} onFinish={onFinish}>
      <ThirdPartySignIn app={app} oauthRequest={handleOAuthRequest}/>
      <FormItem name="fullname" label={t('audiences.contact.addContact.fullName')} rules={[{ required: true }]}>
        <Select
          options={formFields as any}
          labelKey="title"
          tipText={t('integration.selectQuestion')}
          disabled={!authorized}
        />
      </FormItem>
      <FormItem name="email" label={t('login.Email')} rules={[{ required: true }]}>
        <Select
          options={formFields as any}
          labelKey="title"
          tipText={t('integration.selectQuestion')}
          disabled={!authorized}
        />
      </FormItem>
      <FormItem name="phone" label={t('integration.PhoneNumber')}>
        <Select
          options={formFields as any}
          labelKey="title"
          tipText={t('integration.selectQuestion')}
          disabled={!authorized}
        />
      </FormItem>
      <FormItem name="jobtitle" label={t('integration.JobTitle')}>
        <Select
          options={formFields as any}
          labelKey="title"
          tipText={t('integration.selectQuestion')}
          disabled={!authorized}
        />
      </FormItem>
    </SettingsWrapper>
  )
})
