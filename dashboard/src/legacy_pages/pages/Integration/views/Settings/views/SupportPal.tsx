/**
 * @program: dashboard-next
 * @description: SupportPal
 * @author: Mufeng
 * @date: 2021-10-18 09:28
 **/

import { CustomSelect } from '@/legacy_pages/pages/Integration/views/Settings/views/CustomSelect'
import { IntegrationService } from '@/service'
import { useStore } from '@/legacy_pages/utils'
import { isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { SettingsProps, SettingsWrapper } from './SettingsWrapper'
import { FormItem, Input, Select } from '@heyui/component'
import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useParam } from '@/utils'

export const SupportPal: FC<SettingsProps> = observer(({ app, onFinish }) => {
  const { formId } = useParam()
  const formStore = useStore('formStore')
  const formFields = formStore.current?.fields || []

  const [systemURL, setSystemURL] = useState<string | null>()
  const [token, setToken] = useState<string | null>()
  const [departmentId, setDepartmentId] = useState<number | null>()
  const [authorized, setAuthorized] = useState(false)

  async function fetchDepartments() {
    if (!authorized) {
      return []
    }

    const result = await IntegrationService.supportPalDepartments(formId, systemURL!, token!)
    return result
  }

  async function fetchPriorities() {
    if (!authorized) {
      return []
    }

    const result = await IntegrationService.supportPalPriorities(
      formId,
      systemURL!,
      token!,
      departmentId!
    )
    return result
  }

  async function fetchStatus() {
    if (!authorized) {
      return []
    }

    const result = await IntegrationService.supportPalStatus(formId, systemURL!, token!)
    return result
  }

  function handleValuesChange(changed: any, values: any) {
    if (changed.systemURL) {
      setSystemURL(changed.systemURL)
    } else if (changed.token) {
      setToken(changed.token)
    } else if (changed.department) {
      setDepartmentId(changed.department.id)
    }

    setAuthorized(isValid(values.systemURL) && isValid(values.token))
  }

  return (
    <SettingsWrapper app={app} onFinish={onFinish} onValuesChange={handleValuesChange}>
      <FormItem
        name="systemURL"
        label="System URL"
        description={
          <>
            The system URL is the URL you access the frontend of the system with. This can be
            https://support.domain.com or https://domain.com/support for example. The URL may
            require '/index.php' at the end of it if you do not have Pretty URLs enabled.
          </>
        }
        rules={[{ required: true }]}
      >
        <Input />
      </FormItem>
      <FormItem
        name="token"
        label="API Token"
        description={
          <>
            Generate an API token by going to Settings -&gt; General -&gt; API Tokens in the
            operator panel, making sure it has Read & Write access.
            <br />
            <a
              href="https://docs.supportpal.com/current/API+Tokens#CreatingOrUpdating"
              target="_blank"
              rel="noreferrer"
            >
              https://docs.supportpal.com/current/API+Tokens#CreatingOrUpdating
            </a>
            .
          </>
        }
        rules={[{ required: true }]}
      >
        <Input />
      </FormItem>
      <FormItem name="userName" label="User Name (optional)">
        <Select options={formFields as any} labelKey="title" tipText="Select a question" />
      </FormItem>
      <FormItem name="email" label="User Email (optional)">
        <Select options={formFields as any} labelKey="title" tipText="Select a question" />
      </FormItem>
      <FormItem name="subject" label="Subject" rules={[{ required: true }]}>
        <Select options={formFields as any} labelKey="title" tipText="Select a question" />
      </FormItem>
      <FormItem name="text" label="Text" rules={[{ required: true }]}>
        <Select options={formFields as any} labelKey="title" tipText="Select a question" />
      </FormItem>
      <FormItem name="department" label="Department" rules={[{ required: true }]}>
        <CustomSelect
          deps={[formId, authorized]}
          fetch={fetchDepartments}
          labelKey="name"
          disabled={!authorized}
          tipText="Choose department"
        />
      </FormItem>
      <FormItem name="priority" label="Priority" rules={[{ required: true }]}>
        <CustomSelect
          deps={[formId, authorized, departmentId]}
          fetch={fetchPriorities}
          labelKey="name"
          disabled={!authorized}
          tipText="Choose priority"
        />
      </FormItem>
      <FormItem name="status" label="Status" rules={[{ required: true }]}>
        <CustomSelect
          deps={[formId, authorized]}
          fetch={fetchStatus}
          labelKey="name"
          disabled={!authorized}
          tipText="Choose status"
        />
      </FormItem>
    </SettingsWrapper>
  )
})
