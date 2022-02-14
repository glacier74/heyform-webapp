import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useAsync, useParam } from '@/utils'
import { DotsHorizontalIcon } from '@heroicons/react/outline'
import { Avatar, Button, Heading, Navbar } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'

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

  useAsync(async () => {
    const result = await WorkspaceService.members(workspaceId)
    workspaceStore.setMembers(workspaceId, result)
  }, [workspaceId])

  return (
    <div>
      <Heading
        title={workspaceStore.project?.name}
        description={
          <div className="flex items-center">
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
      </div>
    </div>
  )
})

export default Project
