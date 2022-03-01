import { LogoIcon, WorkspaceIcon } from '@/components'
import type { WorkspaceModel } from '@/models'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'
import { Avatar, Button } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const JoinWorkspace = () => {
  const history = useHistory()
  const workspaceStore = useStore('workspaceStore')
  const { workspaceId, inviteCode } = useParam()
  const [workspace, setWorkspace] = useState<WorkspaceModel | null>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function handleClick() {
    setLoading(true)
    setError(null)

    try {
      await WorkspaceService.join(workspaceId, inviteCode)

      // Reload workspaces
      const result = await WorkspaceService.workspaces()
      workspaceStore.setWorkspaces(result)

      history.replace(`/workspace/${workspaceId}`)
    } catch (err: any) {
      setLoading(false)
      setError(err)
    }
  }

  async function fetchWorkspaceDetail() {
    setLoading(true)
    setError(null)

    try {
      const result = await WorkspaceService.publicDetail(workspaceId, inviteCode)
      setWorkspace(result)
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchWorkspaceDetail()
  }, [workspaceId])

  return (
    <div>
      <div>
        <LogoIcon className="h-8 w-auto" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          You've been invited to {workspace?.owner?.name}'s workspace
        </h2>
        <p className="mt-2 text-sm text-gray-600">Join the workspace and start working together!</p>
      </div>

      <div className="mt-8">
        <div className="mt-6">
          <div className="group flex items-center py-2.5 rounded-md text-sm text-gray-700">
            <Avatar
              src={workspace?.avatar}
              size={48}
              defaultIcon={<WorkspaceIcon />}
              rounded
              circular
            />

            <div className="ml-4 flex-auto">
              <p className="text-sm font-medium text-gray-700 truncate">{workspace?.name}</p>
              <p className="text-sm text-gray-500 truncate">{workspace?.memberCount} members</p>
            </div>

            <Button
              className="px-2.5 py-0.5"
              type="primary"
              rounded
              loading={loading}
              onClick={handleClick}
            >
              Join
            </Button>
          </div>

          {error && <p className="text-xs text-red-500">{error.message}</p>}
        </div>
      </div>
    </div>
  )
}

export default observer(JoinWorkspace)