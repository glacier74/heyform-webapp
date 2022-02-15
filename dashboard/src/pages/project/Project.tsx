import { FormService, WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect, useParam } from '@/utils'
import { DotsHorizontalIcon } from '@heroicons/react/outline'
import type { FormModel } from '@heyforms/shared-types-enums'
import { Avatar, Button, Heading, Navbar, Table } from '@heyforms/ui'
import type { TableColumn } from '@heyforms/ui/lib/types/table'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import * as timeago from 'timeago.js'

const Project = observer(() => {
  const { workspaceId, projectId } = useParam()
  const workspaceStore = useStore('workspaceStore')

  const members = useMemo(() => {
    return workspaceStore.members
      .filter(m => workspaceStore.project?.members.includes(m.id))
      .map(m => ({
        src: m.avatar,
        text: m.name
      }))
  }, [workspaceStore.project, workspaceStore.members])

  useAsyncEffect(async () => {
    const result = await WorkspaceService.members(workspaceId)
    workspaceStore.setMembers(workspaceId, result)
  }, [workspaceId])

  useAsyncEffect(async () => {
    const result = await FormService.forms(projectId)
    workspaceStore.setForms(projectId, result)
  }, [projectId])

  // Table columns
  const columns: TableColumn<FormModel>[] = [
    {
      key: 'id',
      name: 'Member',
      width: '40%',
      render(record) {
        return (
          <div>
            <p className="text-sm font-medium text-gray-800 truncate">{record.name}</p>
            <p className="mt-0.5 flex items-center font-normal text-sm text-gray-500">
              <span className="truncate">
                {record.submissionCount && record.submissionCount > 0
                  ? `${record.submissionCount} submissions`
                  : 'No submissions yet'}
              </span>
            </p>
          </div>
        )
      }
    },
    {
      key: 'status',
      name: 'Status',
      width: '30%',
      render(record) {
        return record.status
      }
    },
    {
      key: 'fieldUpdateAt',
      name: 'Last update',
      width: '20%',
      render(record) {
        if (record.fieldUpdateAt) {
          return timeago.format(record.fieldUpdateAt * 1_000)
        }
      }
    },
    {
      key: 'action',
      name: 'Action',
      align: 'right',
      render(record) {
        return <DotsHorizontalIcon className="w-5 h-5 text-gray-400 hover:text-gray-900" />
      }
    }
  ]

  return (
    <div>
      <Heading
        title={workspaceStore.project?.name}
        description={
          <div className="mt-2 flex items-center">
            <Avatar.Group options={members} size={32} maximum={8} circular rounded />
            <Button className="member-manage" leading={<DotsHorizontalIcon />} rounded />
          </div>
        }
        actions={<Button type="primary">Create form</Button>}
      />
      <div className="py-4">
        <Navbar className="mt-4">
          <NavLink to={`/workspace/${workspaceId}/project/${projectId}`} exact>
            Forms
          </NavLink>
          <NavLink to={`/workspace/${workspaceId}/project/${projectId}/trash`}>Trash</NavLink>
        </Navbar>

        <Table<FormModel> className="mt-8" columns={columns} data={workspaceStore.forms} />
      </div>
    </div>
  )
})

export default Project
