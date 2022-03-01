/**
 * @program: dashboard-next
 * @description: Gitlab
 * @author: Mufeng
 * @date: 2021-10-28 12:20
 **/

import { CustomSelect } from '@/legacy_pages/pages/Integration/views/Settings/views/CustomSelect'
import {
  SettingsProps,
  SettingsWrapper
} from '@/legacy_pages/pages/Integration/views/Settings/views/SettingsWrapper'
import { IntegrationService } from '@/service'
import { useStore } from '@/legacy_pages/utils'
import { FormItem, Input, Select } from '@heyui/component'
import { isEmpty, isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useParam } from '@/utils'

export const Gitlab: FC<SettingsProps> = observer(({ app, onFinish }) => {
  const { formId } = useParam()
  const formStore = useStore('formStore')
  const fields = formStore.current?.fields || []

  const [server, setServer] = useState<string>()
  const [token, setToken] = useState<string>()
  const [group, setGroup] = useState<Record<string, any>>()
  const [project, setProject] = useState<Record<string, any>>()
  const [authorized, setAuthorized] = useState(false)

  async function fetchGroups() {
    const result = await IntegrationService.gitlabGroups(formId, server!, token!)
    return result
  }

  async function fetchProjects() {
    const result = await IntegrationService.gitlabProjects(formId, server!, token!, group!.id)
    return result
  }

  async function fetchMembers() {
    const result = await IntegrationService.gitlabMembers(formId, server!, token!, project!.id)
    return result
  }

  async function fetchLabels() {
    const result = await IntegrationService.gitlabLabels(formId, server!, token!, project!.id)
    return result
  }

  async function fetchMilestones() {
    const result = await IntegrationService.gitlabMilestones(formId, server!, token!, project!.id)
    return result
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
      <FormItem
        name="server"
        label="Server URL"
        description={
          <>
            The system URL is the URL you access the frontend of the system with. This can be
            https://domain.com for example.
          </>
        }
        rules={[{ type: 'url', required: true }]}
      >
        <Input />
      </FormItem>
      <FormItem
        name="token"
        label="Personal access tokens"
        description={
          <>
            To obtain the access token, open the https://domain.com/-/profile/personal_access_tokens
            and add a new one. You can also visit the{' '}
            <a href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html">
              help document
            </a>
            .
          </>
        }
        rules={[{ required: true }]}
      >
        <Input />
      </FormItem>
      <FormItem
        name="group"
        label="Select Group"
        description={<>You can select your own group or groups which you are connected with.</>}
        rules={[{ required: true }]}
      >
        <CustomSelect
          deps={[authorized]}
          fetch={fetchGroups}
          labelKey="name"
          tipText="Select a group"
          disabled={!authorized}
        />
      </FormItem>
      <FormItem name="project" label="Select Project" rules={[{ required: true }]}>
        <CustomSelect
          deps={[group?.id]}
          fetch={fetchProjects}
          labelKey="name"
          tipText="Select a project"
          disabled={isEmpty(group?.id)}
        />
      </FormItem>
      <FormItem name="member" label="Select Member (Optional)">
        <CustomSelect
          deps={[project?.id]}
          fetch={fetchMembers}
          labelKey="name"
          tipText="Select a member"
          disabled={isEmpty(project?.id)}
        />
      </FormItem>
      <FormItem name="label" label="Select Label (Optional)">
        <CustomSelect
          deps={[project?.id]}
          fetch={fetchLabels}
          labelKey="name"
          tipText="Select a label"
          disabled={isEmpty(project?.id)}
        />
      </FormItem>
      <FormItem name="milestone" label="Select Milestone (Optional)">
        <CustomSelect
          deps={[project?.id]}
          fetch={fetchMilestones}
          labelKey="name"
          tipText="Select a milestone"
          disabled={isEmpty(project?.id)}
        />
      </FormItem>
      <FormItem name="title" label="Issue title" rules={[{ required: true }]}>
        <Select options={fields as any} labelKey="title" tipText="Select a question" />
      </FormItem>
      <FormItem name="body" label="Issue description (Optional)">
        <Select options={fields as any} labelKey="title" tipText="Select a question" />
      </FormItem>
    </SettingsWrapper>
  )
})
