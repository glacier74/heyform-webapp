import { WorkspaceIcon } from '@/components'
import { PhotoPicker } from '@/components/photoPicker'
import type { ProjectModel, UserModel } from '@/models'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect, useParam } from '@/utils'
import { DotsHorizontalIcon } from '@heroicons/react/outline'
import { Avatar, Button, Heading } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import CreateProject from './CreateProject'

interface ItemProps {
  project: ProjectModel
  users: UserModel[]
}

const Item: FC<ItemProps> = ({ project, users }) => {
  const { workspaceId } = useParam()
  const members = useMemo(() => {
    return users
      .filter(user => project.members.includes(user.id))
      .map(u => ({
        src: u.avatar,
        text: u.name
      }))
  }, [project.members, users])

  return (
    <li className="group col-span-1 bg-white rounded-md border border-gray-200 hover:bg-gray-50">
      <Link to={`/workspace/${workspaceId}/project/${project.id}`}>
        <div className="p-6">
          <h3 className="text-gray-900 text-base font-medium truncate">{project.name}</h3>
          <p className="mt-1 text-gray-500 text-sm truncate">
            {project.formCount > 0 ? `${project.formCount} forms` : 'No forms yet'}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <Avatar.Group options={members} size={32} maximum={8} circular rounded />
            <DotsHorizontalIcon className="opacity-0 group-hover:opacity-100 w-5 h-5 text-gray-400 hover:text-gray-900" />
          </div>
        </div>
      </Link>
    </li>
  )
}

const Workspace = observer(() => {
  const { workspaceId } = useParam()
  const workspaceStore = useStore('workspaceStore')
  const [createProjectOpen, setCreateProjectOpen] = useState(false)

  function handleCreateProject() {
    setCreateProjectOpen(true)
  }

  function handleCloseCreateProject() {
    setCreateProjectOpen(false)
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
        description={`${workspaceStore.workspace?.plan.name} plan | ${workspaceStore.workspace?.memberCount} members`}
        actions={
          <Button type="primary" onClick={handleCreateProject}>
            Create project
          </Button>
        }
      />
      <PhotoPicker />
      <div className="py-4">
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workspaceStore.workspace?.projects.map(project => (
            <Item key={project.id} project={project} users={workspaceStore.members} />
          ))}
        </ul>
      </div>

      {/* Create project */}
      <CreateProject visible={createProjectOpen} onClose={handleCloseCreateProject} />
    </div>
  )
})

export default Workspace
