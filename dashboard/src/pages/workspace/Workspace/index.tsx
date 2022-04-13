import { WorkspaceIcon } from '@/components'
import type { ProjectModel, UserModel } from '@/models'
import { DeleteProject } from '@/pages/project/views/DeleteProject'
import { RenameProject } from '@/pages/project/views/RenameProject'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect, useParam, useVisible } from '@/utils'
import { CollectionIcon, DotsHorizontalIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline'
import { Avatar, Button, Dropdown, EmptyStates, Heading, Menus } from '@heyforms/ui'
import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import CreateProject from './CreateProject'

interface ItemProps {
  project: ProjectModel
  users: UserModel[]
  isOwner?: boolean
  onRename: (project: ProjectModel) => void
  onDelete: (project: ProjectModel) => void
}

const Item: FC<ItemProps> = ({ project, users, isOwner, onRename, onDelete }) => {
  const { workspaceId } = useParam()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const members = useMemo(() => {
    return users
      .filter(user => project.members.includes(user.id))
      .map(u => ({
        src: u.avatar,
        text: u.name
      }))
  }, [project.members, users])
  const [visible, setVisible] = useState(false)

  function handleClick() {
    navigate(`/workspace/${workspaceId}/project/${project.id}`)
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
      <Menus.Item name="rename" label={t('project.rename')} icon={<PencilIcon />} />
      {isOwner && <Menus.Item name="delete" label={t('project.del')} icon={<TrashIcon />} />}
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
          {project.formCount > 0 ? `${project.formCount} forms` : 'No form yet'}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <Avatar.Group options={members} size={32} maximum={8} circular rounded />
          <Dropdown
            className={clsx('opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded-md', {
              'opacity-100': visible
            })}
            overlay={Overlay}
            onDropdownVisibleChange={setVisible}
          >
            <DotsHorizontalIcon className="w-5 h-5 text-gray-400 hover:text-gray-900" />
          </Dropdown>
        </div>
      </div>
    </li>
  )
}

const Workspace = observer(() => {
  const { t } = useTranslation()
  const { workspaceId } = useParam()
  const workspaceStore = useStore('workspaceStore')

  const [project, setProject] = useState<ProjectModel | null>(null)
  const [createProjectVisible, openCreateProject, closeCreateProject] = useVisible()
  const [deleteProjectVisible, openDeleteProject, closeDeleteProject] = useVisible()
  const [renameProjectVisible, openRenameProject, closeRenameProject] = useVisible()

  function handleDelete(proj: ProjectModel) {
    setProject(proj)
    openDeleteProject()
  }

  function handleRename(proj: ProjectModel) {
    setProject(proj)
    openRenameProject()
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
          workspaceStore.workspace?.projects.length > 0 && (
            <Button type="primary" onClick={openCreateProject}>
              {t('workspace.workSpace.createP2')}
            </Button>
          )
        }
      />

      <div className="py-4">
        {workspaceStore.workspace?.projects.length > 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workspaceStore.workspace?.projects.map(proj => (
              <Item
                key={proj.id}
                project={proj}
                users={workspaceStore.members}
                isOwner={workspaceStore.workspace?.isOwner}
                onRename={handleRename}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        ) : (
          <EmptyStates
            className="empty-states-fit mt-8"
            icon={<CollectionIcon className="non-scaling-stroke" />}
            title={t('workspace.workSpace.noProject')}
            description={t('workspace.workSpace.text')}
            action={
              <Button onClick={openCreateProject}>{t('workspace.workSpace.createP2')}</Button>
            }
          />
        )}
      </div>

      {/* Create project */}
      <CreateProject visible={createProjectVisible} onClose={closeCreateProject} />

      {/* Delete project */}
      <DeleteProject
        visible={deleteProjectVisible}
        project={project}
        onClose={closeDeleteProject}
        onComplete={closeDeleteProject}
      />

      {/* Rename project */}
      <RenameProject
        visible={renameProjectVisible}
        project={project}
        onClose={closeRenameProject}
      />
    </div>
  )
})

export default Workspace
