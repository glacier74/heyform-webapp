import { isTrue } from '@hpnp/utils/helper'
import { IconExclamationCircle } from '@tabler/icons-react'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'

import { useStore } from '@/store'
import { useParam } from '@/utils'

export const FreeTrialAlert = observer(() => {
  const workspaceStore = useStore('workspaceStore')
  const { workspaceId } = useParam()

  if (!isTrue(workspaceStore.workspace?.subscription.trialing)) {
    return null
  }

  const date = dayjs.unix(workspaceStore.workspace.subscription.endAt).format('MMM DD')

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 md:px-8">
      <div className="flex w-full items-center rounded-lg bg-slate-100 px-3 py-2.5">
        <div className="flex-shrink-0">
          <IconExclamationCircle className="h-5 w-5 text-slate-500" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-slate-800">Business plan free trial ends on {date}</p>
          <p className="mt-3 text-sm md:mt-0 md:ml-6">
            <NavLink
              to={`/workspace/${workspaceId}/billing`}
              end={true}
              className="text-blue-700 hover:text-blue-800"
            >
              Details <span aria-hidden="true">&rarr;</span>
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  )
})
