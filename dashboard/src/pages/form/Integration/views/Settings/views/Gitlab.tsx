/**
 * @program: dashboard-next
 * @description: Gitlab
 * @author: Mufeng
 * @date: 2021-10-28 12:20
 **/
import { Form, Input, Select } from '@heyforms/ui'
import { isEmpty, isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { IntegrationService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'

import { CustomSelect } from './CustomSelect'
import { SettingsProps, SettingsWrapper } from './SettingsWrapper'

export const Gitlab: FC<SettingsProps> = observer(({ app, onFinish }) => {
  const { formId } = useParam()
  const formStore = useStore('formStore')
  const fields = formStore.fields

  const [server, setServer] = useState<string>()
  const [token, setToken] = useState<string>()
  const [group, setGroup] = useState<Record<string, any>>()
  const [project, setProject] = useState<Record<string, any>>()
  const [authorized, setAuthorized] = useState(false)
  const { t } = useTranslation()

  async function fetchGroups() {
    return await IntegrationService.gitlabGroups(formId, server!, token!)
  }

  async function fetchProjects() {
    return await IntegrationService.gitlabProjects(formId, server!, token!, group!.id)
  }

  async function fetchMembers() {
    return await IntegrationService.gitlabMembers(formId, server!, token!, project!.id)
  }

  async function fetchLabels() {
    return await IntegrationService.gitlabLabels(formId, server!, token!, project!.id)
  }

  async function fetchMilestones() {
    return await IntegrationService.gitlabMilestones(formId, server!, token!, project!.id)
  }

  function handleValuesChange(changed: any, values: any) {
    if (changed.server) {
      setServer(changed.server)
    } else if (changed.token) {
      setToken(changed.token)
    } else if (changed.group) {
      setGroup(changed.group)
    } else if (changed.project) {
      setProject(changed.project)
    }

    setAuthorized(isValid(values.server) && isValid(values.token))
  }

  return (
    <SettingsWrapper app={app} onFinish={onFinish} onValuesChange={handleValuesChange}>
      <Form.Item
        name="server"
        label={t('integration.ServerURL')}
        extra={<>{t('integration.gitlabURL')}</>}
        rules={[{ type: 'url', required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="token"
        label={t('integration.tokens')}
        extra={
          <>
            {t('integration.obtainToken')}{' '}
            <a href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html">
              {t('integration.helpDocument')}
            </a>
            .
          </>
        }
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="group"
        label={t('integration.SelectGroup')}
        extra={<>{t('integration.selectGroup')}</>}
        rules={[{ required: true }]}
      >
        <CustomSelect
          deps={[authorized]}
          fetch={fetchGroups}
          labelKey="name"
          placeholder="Select a group"
          disabled={!authorized}
        />
      </Form.Item>
      <Form.Item name="project" label={t('integration.selectProject')} rules={[{ required: true }]}>
        <CustomSelect
          deps={[group?.id]}
          fetch={fetchProjects}
          labelKey="name"
          placeholder="Select a project"
          disabled={isEmpty(group?.id)}
        />
      </Form.Item>
      <Form.Item name="member" label={t('integration.selectMember')}>
        <CustomSelect
          deps={[project?.id]}
          fetch={fetchMembers}
          labelKey="name"
          placeholder="Select a member"
          disabled={isEmpty(project?.id)}
        />
      </Form.Item>
      <Form.Item name="label" label={t('integration.selectLabel')}>
        <CustomSelect
          deps={[project?.id]}
          fetch={fetchLabels}
          labelKey="name"
          placeholder="Select a label"
          disabled={isEmpty(project?.id)}
        />
      </Form.Item>
      <Form.Item name="milestone" label={t('integration.selectMilestone')}>
        <CustomSelect
          deps={[project?.id]}
          fetch={fetchMilestones}
          labelKey="name"
          placeholder="Select a milestone"
          disabled={isEmpty(project?.id)}
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
