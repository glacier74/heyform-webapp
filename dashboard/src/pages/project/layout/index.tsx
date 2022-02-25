import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect, useVisible, useParam } from '@/utils'
import {
  ChevronDownIcon,
  DotsHorizontalIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/outline'
import { Avatar, Button, Dropdown, Heading, Menus, Navbar } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useMemo } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { DeleteProject } from './DeleteProject'
import { ProjectMembers } from './ProjectMembers'
import { RenameProject } from './RenameProject'
import './index.scss'

interface HeaderProps {
  onRename: () => void
  onDelete: () => void
  onMemberManage: () => void
}

const Header: FC<HeaderProps> = observer(({ onRename, onDelete, onMemberManage }) => {
  const { workspaceId } = useParam()
  const workspaceStore = useStore('workspaceStore')

  const members = useMemo(() => {
    return workspaceStore.members
      .filter(m => workspaceStore.project?.members.includes(m.id))
      .map(m => ({
        src: m.avatar,
        text: m.name
      }))
  }, [workspaceStore.project?.members, workspaceStore.members])

  function handleMenuClick(name?: IKeyType) {
    switch (name) {
      case 'rename':
        return onRename()

      case 'delete':
        return onDelete()
    }
  }

  useAsyncEffect(async () => {
    const result = await WorkspaceService.members(workspaceId)
    workspaceStore.setMembers(workspaceId, result)
  }, [workspaceId])

  return (
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
            onClick={onMemberManage}
          />
        </div>
      }
      actions={<Button type="primary">Create form</Button>}
    />
  )
})

const ProjectLayout: FC<IComponentProps> = ({ children }) => {
  const history = useHistory()
  const { workspaceId, projectId } = useParam()
  const workspaceStore = useStore('workspaceStore')

  const [renameProjectVisible, openRenameProject, closeRenameProject] = useVisible()
  const [deleteProjectVisible, openDeleteProject, closeDeleteProject] = useVisible()
  const [projectMembersVisible, openProjectMembers, closeProjectMembers] = useVisible()

  function handleDeleteProjectComplete() {
    history.replace(`/workspace/${workspaceId}`)
  }

  return (
    <div>
      <Header
        onRename={openRenameProject}
        onDelete={openDeleteProject}
        onMemberManage={openProjectMembers}
      />

      <div className="py-4">
        <Navbar className="mt-4">
          <NavLink to={`/workspace/${workspaceId}/project/${projectId}`} exact>
            Forms
          </NavLink>
          <NavLink to={`/workspace/${workspaceId}/project/${projectId}/trash`}>Trash</NavLink>
        </Navbar>

        {children}
      </div>

      {/* Manage project */}
      <ProjectMembers visible={projectMembersVisible} onClose={closeProjectMembers} />

      {/* Rename project */}
      <RenameProject
        visible={renameProjectVisible}
        project={workspaceStore.project}
        onClose={closeRenameProject}
      />

      {/* Delete project */}
      <DeleteProject
        visible={deleteProjectVisible}
        project={workspaceStore.project}
        onClose={closeDeleteProject}
        onComplete={handleDeleteProjectComplete}
      />
    </div>
  )
}

export default ProjectLayout
