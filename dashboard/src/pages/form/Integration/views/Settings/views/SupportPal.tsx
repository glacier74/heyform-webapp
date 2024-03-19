/**
 * @program: dashboard-next
 * @extra: SupportPal
 * @author: Mufeng
 * @date: 2021-10-18 09:28
 **/
import { Form, Input, Select } from '@heyforms/ui'
import { isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { IntegrationService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'

import { CustomSelect } from './CustomSelect'
import { SettingsProps, SettingsWrapper } from './SettingsWrapper'

export const SupportPal: FC<SettingsProps> = observer(({ app, onFinish }) => {
  const { formId } = useParam()
  const formStore = useStore('formStore')
  const formFields = formStore.fields

  const [systemURL, setSystemURL] = useState<string | null>()
  const [token, setToken] = useState<string | null>()
  const [departmentId, setDepartmentId] = useState<number | null>()
  const [authorized, setAuthorized] = useState(false)
  const { t } = useTranslation()

  async function fetchDepartments() {
    if (!authorized) {
      return []
    }

    return await IntegrationService.supportPalDepartments(formId, systemURL!, token!)
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

    return await IntegrationService.supportPalStatus(formId, systemURL!, token!)
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
      <Form.Item
        name="systemURL"
        label={t('integration.SystemURL')}
        extra={<>{t('integration.URLText')}</>}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="token"
        label={t('integration.tokenAPT')}
        extra={
          <>
            {t('integration.APIText')}
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
      </Form.Item>
      <Form.Item name="userName" label={t('integration.UserName')}>
        <Select
          options={formFields as any}
          labelKey="title"
          placeholder={t('integration.selectQuestion')}
        />
      </Form.Item>
      <Form.Item name="email" label={t('integration.UserEmail')}>
        <Select
          options={formFields as any}
          labelKey="title"
          placeholder={t('integration.selectQuestion')}
        />
      </Form.Item>
      <Form.Item name="subject" label={t('integration.Subject')} rules={[{ required: true }]}>
        <Select
          options={formFields as any}
          labelKey="title"
          placeholder={t('integration.selectQuestion')}
        />
      </Form.Item>
      <Form.Item name="text" label={t('integration.Text')} rules={[{ required: true }]}>
        <Select
          options={formFields as any}
          labelKey="title"
          placeholder={t('integration.selectQuestion')}
        />
      </Form.Item>
      <Form.Item name="department" label={t('integration.Department')} rules={[{ required: true }]}>
        <CustomSelect
          deps={[formId, authorized]}
          fetch={fetchDepartments}
          labelKey="name"
          disabled={!authorized}
          placeholder={t('integration.department')}
        />
      </Form.Item>
      <Form.Item name="priority" label={t('integration.Priority')} rules={[{ required: true }]}>
        <CustomSelect
          deps={[formId, authorized, departmentId]}
          fetch={fetchPriorities}
          labelKey="name"
          disabled={!authorized}
          placeholder={t('integration.ChoosePriority')}
        />
      </Form.Item>
      <Form.Item name="status" label={t('integration.Status')} rules={[{ required: true }]}>
        <CustomSelect
          deps={[formId, authorized]}
          fetch={fetchStatus}
          labelKey="name"
          disabled={!authorized}
          placeholder={t('integration.ChooseStatus')}
        />
      </Form.Item>
    </SettingsWrapper>
  )
})
