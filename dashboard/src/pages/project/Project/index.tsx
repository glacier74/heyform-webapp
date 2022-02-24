import { FormService, WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect, useParam } from '@/utils'
import {
  ChevronDownIcon,
  DotsHorizontalIcon,
  DuplicateIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/outline'
import type { FormModel } from '@heyforms/shared-types-enums'
import { Avatar, Badge, Button, Dropdown, Heading, Menus, Navbar, Table } from '@heyforms/ui'
import type { TableColumn } from '@heyforms/ui/lib/types/table'
import { observer } from 'mobx-react-lite'
import { useMemo, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import * as timeago from 'timeago.js'
import { DeleteProject } from './DeleteProject'
import './index.scss'
import { ProjectMembers } from './ProjectMembers'
import { RenameProject } from './RenameProject'

const Project = observer(() => {
  const history = useHistory()
  const { workspaceId, projectId } = useParam()
  const workspaceStore = useStore('workspaceStore')

  const [projectMembersOpen, setProjectMembersOpen] = useState(false)
  const [deleteProjectOpen, setDeleteProjectOpen] = useState(false)
  const [renameProjectOpen, setRenameProjectOpen] = useState(false)

  const members = useMemo(() => {
    return workspaceStore.members
      .filter(m => workspaceStore.project?.members.includes(m.id))
      .map(m => ({
        src: m.avatar,
        text: m.name
      }))
  }, [workspaceStore.project?.members, workspaceStore.members])

  function handleProjectMembersOpen() {
    setProjectMembersOpen(true)
  }

  function handleProjectMembersClose() {
    setProjectMembersOpen(false)
  }

  function handleDeleteProjectClose() {
    setDeleteProjectOpen(false)
  }

  function handleRenameProjectClose() {
    setRenameProjectOpen(false)
  }

  function handleMenuClick(name?: IKeyType) {
    switch (name) {
      case 'rename':
        setRenameProjectOpen(true)
        break

      case 'delete':
        setDeleteProjectOpen(true)
        break
    }
  }

  function handleDeleteProjectComplete() {
    history.replace(`/workspace/${workspaceId}`)
  }

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
      name: 'Form name',
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
        if (record.draft) {
          return <Badge className="form-status" text="Draft" dot />
        } else if (record.suspended) {
          return <Badge className="form-status" type="red" text="Suspended" dot />
        } else if (record.settings?.active) {
          return <Badge className="form-status" type="blue" text="Active" dot />
        } else {
          return <Badge className="form-status" text="Closed" dot />
        }
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
        return (
          <Dropdown
            overlay={
              <Menus>
                <Menus.Item name="edit" icon={<PencilIcon />} label="Edit" />
                <Menus.Item name="duplicate" icon={<DuplicateIcon />} label="Duplicate" />
                <Menus.Item name="delete" icon={<TrashIcon />} label="Delete" />
              </Menus>
            }
          >
            <Button.Link className="-m-3" leading={<DotsHorizontalIcon />} />
          </Dropdown>
        )
      }
    }
  ]

  return (
    <div>
      <Heading
        title={
          <div className="flex items-center">
            <span>{workspaceStore.project?.name}</span>
            <Dropdown
              className="ml-1 p-1 rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
              placement="bottom-start"
              overlay={
                <Menus onClick={handleMenuClick}>
                  <Menus.Item name="rename" icon={<PencilIcon />} label="Rename" />
                  <Menus.Item name="delete" icon={<TrashIcon />} label="Delete" />
                </Menus>
              }
            >
              <ChevronDownIcon className="w-5 h-5" />
            </Dropdown>
          </div>
        }
        description={
          <div className="mt-2 flex items-center">
            <Avatar.Group options={members} size={32} maximum={8} circular rounded />
            <Button
              className="ml-2 w-8 h-8 p-1.5"
              leading={<DotsHorizontalIcon />}
              rounded
              onClick={handleProjectMembersOpen}
            />
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

      {/* Manage project */}
      <ProjectMembers visible={projectMembersOpen} onClose={handleProjectMembersClose} />

      {/* Rename project */}
      <RenameProject
        visible={renameProjectOpen}
        project={workspaceStore.project}
        onClose={handleRenameProjectClose}
      />

      {/* Delete project */}
      <DeleteProject
        visible={deleteProjectOpen}
        project={workspaceStore.project}
        onClose={handleDeleteProjectClose}
        onComplete={handleDeleteProjectComplete}
      />
    </div>
  )
})

export default Project
