import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useAsync, useParam } from '@/utils'
import { Button, Heading } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'

const Project = observer(() => {
  const { workspaceId } = useParam()
  const workspaceStore = useStore('workspaceStore')

  useAsync(async () => {
    const result = await WorkspaceService.members(workspaceId)
    workspaceStore.setMembers(workspaceId, result)
  }, [workspaceId])

  return (
    <div>
      <Heading
        title={workspaceStore.workspace.name}
        description={`${workspaceStore.workspace.plan.name} plan | ${workspaceStore.workspace.memberCount} members`}
        actions={<Button type="primary">Create project</Button>}
      />
      <div className="py-4"></div>
    </div>
  )
})

export default Project
