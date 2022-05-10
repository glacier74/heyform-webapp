/**
 * @program: dashboard-next
 * @description: Github
 * @author: Mufeng
 * @date: 2021-10-28 12:20
 **/

import { CustomSelect } from '@/legacy_pages/pages/Integration/views/Settings/views/CustomSelect'
import {
  SettingsProps,
  SettingsWrapper
} from '@/legacy_pages/pages/Integration/views/Settings/views/SettingsWrapper'
import { ThirdPartySignIn } from '@/legacy_pages/pages/Integration/views/Settings/views/ThirdPartySignIn'
import { useStore } from '@/legacy_pages/utils'
import { IntegrationService } from '@/service'
import { useParam } from '@/utils'
import { FormItem, Select } from '@heyui/component'
import { isEmpty } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Github: FC<SettingsProps> = observer(({ app, onFinish }) => {
  const { formId } = useParam()
  const appId = app!.id
  const formStore = useStore('formStore')
  const fields = formStore.fields
  const { t } = useTranslation()

  const [authorized, setAuthorized] = useState(false)
  const [organization, setOrganization] = useState<Record<string, any>>()
  const [repository, setRepository] = useState<string>()

  async function handleOAuthRequest(code: string) {
    const result = await IntegrationService.githubOauth(formId, appId, code)
    setAuthorized(result)
  }

  async function fetchOrganizations() {
    const result = await IntegrationService.githubOrganizations(formId, appId)
    return result
  }

  async function fetchRepositories() {
    const result = await IntegrationService.githubRepositories(formId, appId, organization!)
    return result.map((item: string) => ({
      id: item
    }))
  }

  async function fetchAssignees() {
    const result = await IntegrationService.githubAssignees(formId, appId, repository!)
    return result.map((item: string) => ({
      id: item
    }))
  }

  async function fetchLabels() {
    const result = await IntegrationService.githubLabels(formId, appId, repository!)
    return result.map((item: string) => ({
      id: item
    }))
  }

  async function fetchMilestones() {
    const result = await IntegrationService.githubMilestones(formId, appId, repository!)
    return result
  }

  function handleValuesChange(changed: any) {
    if (changed.organization) {
      setOrganization(changed.organization)
    } else if (changed.repository) {
      setRepository(changed.repository)
    }
  }

  return (
    <SettingsWrapper app={app} onFinish={onFinish} onValuesChange={handleValuesChange}>
      <ThirdPartySignIn app={app} oauthRequest={handleOAuthRequest} />
      <FormItem
        name="organization"
        label={t('integration.SelectOrganization')}
        description={<>{t('integration.githubConnect')}</>}
        rules={[{ required: true }]}
      >
        <CustomSelect
          deps={[authorized]}
          fetch={fetchOrganizations}
          labelKey="login"
          valueKey="login"
          tipText="Select a organization"
          disabled={!authorized}
        />
      </FormItem>
      <FormItem
        name="repository"
        label={t('integration.selectRepository')}
        rules={[{ required: true }]}
      >
        <CustomSelect
          deps={[organization?.login]}
          fetch={fetchRepositories}
          labelKey="id"
          returnObjectValue={false}
          tipText="Select a repository"
          disabled={isEmpty(organization?.login)}
        />
      </FormItem>
      <FormItem name="assignee" label={t('integration.selectAssignee')}>
        <CustomSelect
          deps={[organization?.login, repository]}
          fetch={fetchAssignees}
          labelKey="id"
          valueKey="id"
          returnObjectValue={false}
          tipText="Select a assignee"
          disabled={isEmpty(organization?.login) || isEmpty(repository)}
        />
      </FormItem>
      <FormItem name="label" label={t('integration.selectLabel')}>
        <CustomSelect
          deps={[organization?.login, repository]}
          fetch={fetchLabels}
          labelKey="id"
          valueKey="id"
          returnObjectValue={false}
          tipText="Select a label"
          disabled={isEmpty(organization?.login) || isEmpty(repository)}
        />
      </FormItem>
      <FormItem name="milestone" label={t('integration.selectMilestone')}>
        <CustomSelect
          deps={[organization?.login, repository]}
          fetch={fetchMilestones}
          labelKey="title"
          valueKey="number"
          tipText="Select a milestone"
          disabled={isEmpty(organization?.login) || isEmpty(repository)}
        />
      </FormItem>
      <FormItem name="title" label={t('integration.issueTitle')} rules={[{ required: true }]}>
        <Select options={fields as any} labelKey="title" tipText="Select a question" />
      </FormItem>
      <FormItem name="body" label={t('integration.issueDescription')}>
        <Select options={fields as any} labelKey="title" tipText="Select a question" />
      </FormItem>
    </SettingsWrapper>
  )
})
