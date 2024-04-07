/**
 * @program: dashboard-next
 * @description: Github
 * @author: Mufeng
 * @date: 2021-10-28 12:20
 **/
import { Form, Select } from '@heyforms/ui'
import { isEmpty } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { IntegrationService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'

import { CustomSelect } from './CustomSelect'
import { SettingsProps, SettingsWrapper } from './SettingsWrapper'
import { ThirdPartySignIn } from './ThirdPartySignIn'

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
    return await IntegrationService.githubOrganizations(formId, appId)
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
    return await IntegrationService.githubMilestones(formId, appId, repository!)
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
      <Form.Item
        name="organization"
        label={t('integration.SelectOrganization')}
        extra={<>{t('integration.githubConnect')}</>}
        rules={[{ required: true }]}
      >
        <CustomSelect
          deps={[authorized]}
          fetch={fetchOrganizations}
          labelKey="login"
          valueKey="login"
          placeholder="Select a organization"
          disabled={!authorized}
        />
      </Form.Item>
      <Form.Item
        name="repository"
        label={t('integration.selectRepository')}
        rules={[{ required: true }]}
      >
        <CustomSelect
          deps={[organization?.login]}
          fetch={fetchRepositories}
          labelKey="id"
          returnObjectValue={false}
          placeholder="Select a repository"
          disabled={isEmpty(organization?.login)}
        />
      </Form.Item>
      <Form.Item name="assignee" label={t('integration.selectAssignee')}>
        <CustomSelect
          deps={[organization?.login, repository]}
          fetch={fetchAssignees}
          labelKey="id"
          valueKey="id"
          returnObjectValue={false}
          placeholder="Select a assignee"
          disabled={isEmpty(organization?.login) || isEmpty(repository)}
        />
      </Form.Item>
      <Form.Item name="label" label={t('integration.selectLabel')}>
        <CustomSelect
          deps={[organization?.login, repository]}
          fetch={fetchLabels}
          labelKey="id"
          valueKey="id"
          returnObjectValue={false}
          placeholder="Select a label"
          disabled={isEmpty(organization?.login) || isEmpty(repository)}
        />
      </Form.Item>
      <Form.Item name="milestone" label={t('integration.selectMilestone')}>
        <CustomSelect
          deps={[organization?.login, repository]}
          fetch={fetchMilestones}
          labelKey="title"
          valueKey="number"
          placeholder="Select a milestone"
          disabled={isEmpty(organization?.login) || isEmpty(repository)}
        />
      </Form.Item>
      <Form.Item name="title" label={t('integration.issueTitle')} rules={[{ required: true }]}>
        <Select
          options={fields as any}
          labelKey="title"
          valueKey="id"
          placeholder="Select a question"
        />
      </Form.Item>
      <Form.Item name="body" label={t('integration.issueDescription')}>
        <Select
          options={fields as any}
          labelKey="title"
          valueKey="id"
          placeholder="Select a question"
        />
      </Form.Item>
    </SettingsWrapper>
  )
})
