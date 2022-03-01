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
import { IntegrationService } from '@/service'
import { useStore } from '@/legacy_pages/utils'
import { FormItem, Image, Select } from '@heyui/component'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useParam } from '@/utils'
import styled from 'styled-components'

export const Mailchimp: FC<SettingsProps> = observer(({ app, onFinish }) => {
  const { formId } = useParam()
  const appId = app!.id
  const [authorized, setAuthorized] = useState(false)
  const formStore = useStore('formStore')
  const fields = formStore.current?.fields || []

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
      <FormItem name="audience" label="Select Audience" rules={[{ required: true }]}>
        <CustomSelect
          deps={[authorized]}
          fetch={fetchAudiences}
          labelKey="name"
          tipText="Select a audience"
          disabled={!authorized}
        />
      </FormItem>
      <FormItem name="email" label="Subscriber Email" rules={[{ required: true }]}>
        <Select options={fields as any} labelKey="title" tipText="Select a question" />
      </FormItem>
      <FormItem name="fullName" label="Full Name" rules={[{ required: false }]}>
        <Select options={fields as any} labelKey="title" tipText="Select a question" />
      </FormItem>
      <FormItem name="address" label="Address" rules={[{ required: false }]}>
        <Select options={fields as any} labelKey="title" tipText="Select a question" />
      </FormItem>
      <FormItem name="phoneNumber" label="Phone Number" rules={[{ required: false }]}>
        <Select options={fields as any} labelKey="title" tipText="Select a question" />
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
