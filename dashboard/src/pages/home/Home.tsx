import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect, useQuery, useQueryURL, useRouter } from '@/utils'
import { isEmpty, isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'

const Home: FC = observer(() => {
  const router = useRouter()
  const query = useQuery()
  const workspaceStore = useStore('workspaceStore')
  const nextURL = useQueryURL('/workspace/create')

  useAsyncEffect(async () => {
    let list = workspaceStore.list
    const currentWorkspaceId = workspaceStore.currentWorkspaceId

    if (isEmpty(list)) {
      const result = await WorkspaceService.workspaces()
      workspaceStore.setWorkspaces(result)

      // 用户必须要有一个 workspace，否则跳转到新建页面
      if (isEmpty(result)) {
        return router.redirect(nextURL)
      }

      list = result
    }

    // 用户有 workspaces 则跳转到重定向网址
    if (isValid(query.redirect_uri)) {
      return router.redirect(query.redirect_uri)
    }

    let workspaceId = list![0].id

    if (isValid(currentWorkspaceId)) {
      const index = list!.findIndex(row => row.id === workspaceId)

      if (index > -1) {
        workspaceId = currentWorkspaceId!
      }
    }

    // Navigate to last visited workspace
    router.replace(`/workspace/${workspaceId}`)
  }, [workspaceStore.list])

  return <></>
})

export default Home
