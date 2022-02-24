import { WorkspaceIcon } from '@/components'
import type { ProjectModel, UserModel } from '@/models'
import { DeleteProject } from '@/pages/project/Project/DeleteProject'
import { RenameProject } from '@/pages/project/Project/RenameProject'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect, useParam } from '@/utils'
import { DotsHorizontalIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline'
import { Avatar, Button, Dropdown, Heading, Menus } from '@heyforms/ui'
import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CreateProject from './CreateProject'

interface ItemProps {
  project: ProjectModel
  users: UserModel[]
  onRename: (project: ProjectModel) => void
  onDelete: (project: ProjectModel) => void
}

const Item: FC<ItemProps> = ({ project, users, onRename, onDelete }) => {
  const { workspaceId } = useParam()
  const history = useHistory()
  const members = useMemo(() => {
    return users
      .filter(user => project.members.includes(user.id))
      .map(u => ({
        src: u.avatar,
        text: u.name
      }))
  }, [project.members, users])
  const [isOpen, setIsOpen] = useState(false)

  function handleClick() {
    history.push(`/workspace/${workspaceId}/project/${project.id}`)
  }

  function handleMenuClick(name?: IKeyType) {
    switch (name) {
      case 'rename':
        onRename(project)
        break

      case 'delete':
        onDelete(project)
        break
    }
  }

  const Overlay = (
    <Menus onClick={handleMenuClick}>
      <Menus.Item name="rename" label="Rename" icon={<PencilIcon />} />
      <Menus.Item name="delete" label="Delete" icon={<TrashIcon />} />
    </Menus>
  )

  return (
    <li
      className="group col-span-1 bg-white rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer"
      onClick={handleClick}
    >
      <div className="p-6">
        <h3 className="text-gray-900 text-base font-medium truncate">{project.name}</h3>
        <p className="mt-1 text-gray-500 text-sm truncate">
          {project.formCount > 0 ? `${project.formCount} forms` : 'No forms yet'}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <Avatar.Group options={members} size={32} maximum={8} circular rounded />
          <Dropdown
            className={clsx('opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded-md', {
              'opacity-100': isOpen
            })}
            overlay={Overlay}
            onVisibleChange={setIsOpen}
          >
            <DotsHorizontalIcon className="w-5 h-5 text-gray-400 hover:text-gray-900" />
          </Dropdown>
        </div>
      </div>
    </li>
  )
}

const Workspace = observer(() => {
  const { workspaceId } = useParam()
  const workspaceStore = useStore('workspaceStore')

  const [createProjectOpen, setCreateProjectOpen] = useState(false)
  const [project, setProject] = useState<ProjectModel | null>(null)
  const [deleteProjectOpen, setDeleteProjectOpen] = useState(false)
  const [renameProjectOpen, setRenameProjectOpen] = useState(false)

  function handleCreateProject() {
    setCreateProjectOpen(true)
  }

  function handleCloseCreateProject() {
    setCreateProjectOpen(false)
  }

  function handleCloseDeleteProject() {
    setDeleteProjectOpen(false)
    setProject(null)
  }

  function handleCloseRenameProject() {
    setRenameProjectOpen(false)
    setProject(null)
  }

  function handleDeleteProject(currProj: ProjectModel) {
    setProject(currProj)
    setDeleteProjectOpen(true)
  }

  function handleRenameProject(currProj: ProjectModel) {
    setProject(currProj)
    setRenameProjectOpen(true)
  }

  useAsyncEffect(async () => {
    const result = await WorkspaceService.members(workspaceId)
    workspaceStore.setMembers(workspaceId, result)
  }, [workspaceId])

  return (
    <div>
      <Heading
        title={workspaceStore.workspace?.name}
        icon={
          <Avatar
            src={workspaceStore.workspace?.avatar}
            defaultIcon={<WorkspaceIcon />}
            size={54}
            rounded
            circular
          />
        }
        description={`${workspaceStore.workspace?.plan.name} plan · ${workspaceStore.workspace?.memberCount} members`}
        actions={
          <Button type="primary" onClick={handleCreateProject}>
            Create project
          </Button>
        }
      />
      <div className="py-4">
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workspaceStore.workspace?.projects.map(proj => (
            <Item
              key={proj.id}
              project={proj}
              users={workspaceStore.members}
              onDelete={handleDeleteProject}
              onRename={handleRenameProject}
            />
          ))}
        </ul>
      </div>

      {/* Create project */}
      <CreateProject visible={createProjectOpen} onClose={handleCloseCreateProject} />

      {/* Delete project */}
      <DeleteProject
        visible={deleteProjectOpen}
        project={project}
        onClose={handleCloseDeleteProject}
        onComplete={handleCloseDeleteProject}
      />

      {/* Rename project */}
      <RenameProject
        visible={renameProjectOpen}
        project={project}
        onClose={handleCloseRenameProject}
      />
    </div>
  )
})

export default Workspace
