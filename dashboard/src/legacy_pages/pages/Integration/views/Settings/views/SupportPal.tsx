/**
 * @program: dashboard-next
 * @description: SupportPal
 * @author: Mufeng
 * @date: 2021-10-18 09:28
 **/

import { CustomSelect } from '@/legacy_pages/pages/Integration/views/Settings/views/CustomSelect'
import { useStore } from '@/legacy_pages/utils'
import { IntegrationService } from '@/service'
import { useParam } from '@/utils'
import { FormItem, Input, Select } from '@heyui/component'
import { isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SettingsProps, SettingsWrapper } from './SettingsWrapper'

export const SupportPal: FC<SettingsProps> = observer(({ app, onFinish }) => {
  const { formId } = useParam()
  const formStore = useStore('formStore')
  const formFields = formStore.current?.fields || []

  const [systemURL, setSystemURL] = useState<string | null>()
  const [token, setToken] = useState<string | null>()
  const [departmentId, setDepartmentId] = useState<number | null>()
  const [authorized, setAuthorized] = useState(false)
  const { t } = useTranslation()

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
        label={t('integration.SystemURL')}
        description={
          <>
            {t('integration.URLText')}
          </>
        }
        rules={[{ required: true }]}
      >
        <Input/>
      </FormItem>
      <FormItem
        name="token"
        label={t('integration.tokenAPT')}
        description={
          <>
            {t('integration.APIText')}
            <br/>
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
        <Input/>
      </FormItem>
      <FormItem name="userName" label={t('integration.UserName')}>
        <Select options={formFields as any} labelKey="title" tipText={t('integration.selectQuestion')}/>
      </FormItem>
      <FormItem name="email" label={t('integration.UserEmail')}>
        <Select options={formFields as any} labelKey="title" tipText={t('integration.selectQuestion')}/>
      </FormItem>
      <FormItem name="subject" label={t('integration.Subject')} rules={[{ required: true }]}>
        <Select options={formFields as any} labelKey="title" tipText={t('integration.selectQuestion')}/>
      </FormItem>
      <FormItem name="text" label={t('integration.Text')} rules={[{ required: true }]}>
        <Select options={formFields as any} labelKey="title" tipText={t('integration.selectQuestion')}/>
      </FormItem>
      <FormItem name="department" label={t('integration.Department')} rules={[{ required: true }]}>
        <CustomSelect
          deps={[formId, authorized]}
          fetch={fetchDepartments}
          labelKey="name"
          disabled={!authorized}
          tipText={t('integration.department')}
        />
      </FormItem>
      <FormItem name="priority" label={t('integration.Priority')} rules={[{ required: true }]}>
        <CustomSelect
          deps={[formId, authorized, departmentId]}
          fetch={fetchPriorities}
          labelKey="name"
          disabled={!authorized}
          tipText={t('integration.ChoosePriority')}
        />
      </FormItem>
      <FormItem name="status" label={t('integration.Status')} rules={[{ required: true }]}>
        <CustomSelect
          deps={[formId, authorized]}
          fetch={fetchStatus}
          labelKey="name"
          disabled={!authorized}
          tipText={t('integration.ChooseStatus')}
        />
      </FormItem>
    </SettingsWrapper>
  )
})
