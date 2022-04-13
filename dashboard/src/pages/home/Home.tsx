import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect } from '@/utils'
import { isEmpty, isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Home: FC = observer(() => {
  const navigate = useNavigate()
  const workspaceStore = useStore('workspaceStore')

  useAsyncEffect(async () => {
    let list = workspaceStore.list
    const currentWorkspaceId = workspaceStore.currentWorkspaceId

    if (isEmpty(list)) {
      const result = await WorkspaceService.workspaces()
      workspaceStore.setWorkspaces(result)

      if (isEmpty(result)) {
        return navigate('/setup', {
          replace: true
        })
      }

      list = result
    }

    let workspaceId = list![0].id

    if (isValid(currentWorkspaceId)) {
      const index = list!.findIndex(row => row.id === workspaceId)

      if (index > -1) {
        workspaceId = currentWorkspaceId!
      }
    }

    // Navigate to last visited workspace
    navigate(`/workspace/${workspaceId}`, {
      replace: true
    })
  }, [workspaceStore.list])

  return <></>
})

export default Home
