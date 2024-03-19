import { isEmpty, isValid } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'

import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect, useQuery, useQueryURL, useRouter } from '@/utils'

const INVITATION_REGEX = /\/workspace\/[^\/]+\/invitation\/[^\/]+/i

const Home: FC = observer(() => {
  const router = useRouter()
  const query = useQuery()
  const workspaceStore = useStore('workspaceStore')
  const nextURL = useQueryURL('/workspace/create')

  useAsyncEffect(async () => {
    let list = workspaceStore.list
    const currentWorkspaceId = workspaceStore.currentWorkspaceId
    const redirectUri = query.redirect_uri

    // 如果用户从邀请链接跳转，不管是否有 workspace 都跳转到邀请页面
    if (INVITATION_REGEX.test(redirectUri)) {
      return router.redirect(redirectUri)
    }

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
    if (isValid(redirectUri)) {
      return router.redirect(redirectUri)
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
