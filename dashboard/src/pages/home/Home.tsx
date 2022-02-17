import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect } from '@/utils'
import { isEmpty, isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useHistory } from 'react-router-dom'

const Home: FC = observer(() => {
  const history = useHistory()
  const workspaceStore = useStore('workspaceStore')

  useAsyncEffect(async () => {
    let list = workspaceStore.list
    const currentWorkspaceId = workspaceStore.currentWorkspaceId

    if (isEmpty(list)) {
      const result = await WorkspaceService.workspaces()
      workspaceStore.setWorkspaces(result)

      if (isEmpty(result)) {
        return history.replace('/workspace/create')
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
    history.replace(`/workspace/${workspaceId}`)
  }, [workspaceStore.list])

  return <></>
})

export default Home
