import { useStore } from '@/store'
import { useParam } from '@/utils'
import { ExclamationIcon } from '@heroicons/react/solid'
import { isTrue } from '@hpnp/utils/helper'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'

export const FreeTrialAlert = observer(() => {
  const workspaceStore = useStore('workspaceStore')
  const { workspaceId } = useParam()

  if (!isTrue(workspaceStore.workspace?.subscription.trialing)) {
    return null
  }

  const date = dayjs.unix(workspaceStore.workspace.subscription.endAt).format('MMM DD')

  return (
    <div className="max-w-7xl mx-auto px-4 pt-6 sm:px-6 md:px-8">
      <div className="w-full flex items-center px-3 py-2.5 bg-slate-100 rounded-lg">
        <div className="flex-shrink-0">
          <ExclamationIcon className="h-5 w-5 text-slate-500" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-slate-800">Premium plan free trial ends on {date}</p>
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
