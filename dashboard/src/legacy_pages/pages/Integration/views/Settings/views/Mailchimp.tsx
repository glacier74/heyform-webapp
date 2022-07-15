/**
 * @program: dashboard-next
 * @description: Mailchimp
 * @author: Mufeng
 * @date: 2021-06-16 11:18
 **/

import { CustomSelect } from '@/legacy_pages/pages/Integration/views/Settings/views/CustomSelect'
import {
  SettingsProps,
  SettingsWrapper
} from '@/legacy_pages/pages/Integration/views/Settings/views/SettingsWrapper'
import { commonCss } from '@/legacy_pages/pages/Integration/views/Settings/views/Summary'
import { ThirdPartySignIn } from '@/legacy_pages/pages/Integration/views/Settings/views/ThirdPartySignIn'
import { useStore } from '@/legacy_pages/utils'
import { IntegrationService } from '@/service'
import { useParam } from '@/utils'
import { FormItem, Image, Select } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export const Mailchimp: FC<SettingsProps> = observer(({ app, onFinish }) => {
  const { formId } = useParam()
  const appId = app!.id
  const [authorized, setAuthorized] = useState(false)
  const formStore = useStore('formStore')
  const fields = formStore.fields
  const { t } = useTranslation()

  async function fetchAudiences() {
    const result = await IntegrationService.mailchimpAudiences(formId, appId)
    return result
  }

  async function handleOAuthRequest(code: string) {
    const result = await IntegrationService.mailchimpOauth(formId, appId, code)
    setAuthorized(result)
  }

  return (
    <SettingsWrapper app={app} onFinish={onFinish}>
      <ThirdPartySignIn app={app} oauthRequest={handleOAuthRequest} />
      <FormItem
        name="audience"
        label={t('integration.SelectAudience')}
        rules={[{ required: true }]}
      >
        <CustomSelect
          deps={[authorized]}
          fetch={fetchAudiences}
          labelKey="name"
          tipText={t('integration.selectQuestion')}
          disabled={!authorized}
        />
      </FormItem>
      <FormItem name="email" label={t('integration.SubscriberEmail')} rules={[{ required: true }]}>
        <Select
          options={fields as any}
          labelKey="title"
          tipText={t('integration.selectQuestion')}
        />
      </FormItem>
      <FormItem
        name="fullName"
        label={t('audiences.contact.addContact.fullName')}
        rules={[{ required: false }]}
      >
        <Select
          options={fields as any}
          labelKey="title"
          tipText={t('integration.selectQuestion')}
        />
      </FormItem>
      <FormItem name="address" label={t('integration.Address')} rules={[{ required: false }]}>
        <Select
          options={fields as any}
          labelKey="title"
          tipText={t('integration.selectQuestion')}
        />
      </FormItem>
      <FormItem
        name="phoneNumber"
        label={t('audiences.contact.addContact.phoneNumber')}
        rules={[{ required: false }]}
      >
        <Select
          options={fields as any}
          labelKey="title"
          tipText={t('integration.selectQuestion')}
        />
      </FormItem>
    </SettingsWrapper>
  )
})

const ImageContainer = styled(Image)`
  ${commonCss};
  width: 20px;
  height: 20px;
  margin-right: 12px;
`
