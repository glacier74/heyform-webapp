/**
 * @program: dashboard-next
 * @description: Hubspot
 * @author: Mufeng
 * @date: 2021-06-29 11:18
 **/

import {
  SettingsProps,
  SettingsWrapper
} from '@/legacy_pages/pages/Integration/views/Settings/views/SettingsWrapper'
import { ThirdPartySignIn } from '@/legacy_pages/pages/Integration/views/Settings/views/ThirdPartySignIn'
import { IntegrationService } from '@/service'
import { useStore } from '@/legacy_pages/utils'
import { FormItem, Select } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useParam } from '@/utils'

export const Hubspot: FC<SettingsProps> = observer(({ app, onFinish }) => {
  const { formId } = useParam()
  const appId = app!.id
  const [authorized, setAuthorized] = useState(false)
  const formStore = useStore('formStore')
  const formFields = formStore.current?.fields || []

  async function handleOAuthRequest(code: string) {
    const result = await IntegrationService.hubspotOauth(formId, appId, code)
    setAuthorized(result)
  }

  return (
    <SettingsWrapper app={app} onFinish={onFinish}>
      <ThirdPartySignIn app={app} oauthRequest={handleOAuthRequest} />
      <FormItem name="fullname" label="Full Name" rules={[{ required: true }]}>
        <Select
          options={formFields as any}
          labelKey="title"
          tipText="Select a question"
          disabled={!authorized}
        />
      </FormItem>
      <FormItem name="email" label="Email Address" rules={[{ required: true }]}>
        <Select
          options={formFields as any}
          labelKey="title"
          tipText="Select a question"
          disabled={!authorized}
        />
      </FormItem>
      <FormItem name="phone" label="Phone Number (Optional)">
        <Select
          options={formFields as any}
          labelKey="title"
          tipText="Select a question"
          disabled={!authorized}
        />
      </FormItem>
      <FormItem name="jobtitle" label="Job Title (Optional)">
        <Select
          options={formFields as any}
          labelKey="title"
          tipText="Select a question"
          disabled={!authorized}
        />
      </FormItem>
    </SettingsWrapper>
  )
})
