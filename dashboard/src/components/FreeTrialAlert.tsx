import { useStore } from '@/store'
import { ExclamationIcon } from '@heroicons/react/solid'
import { isTrue } from '@hpnp/utils/helper'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'

export const FreeTrialAlert = observer(() => {
  const workspaceStore = useStore('workspaceStore')

  if (!isTrue(workspaceStore.workspace?.subscription.trialing)) {
    return null
  }

  const date = dayjs.unix(workspaceStore.workspace.subscription.endAt).format('MMM DD')

  return (
    <div className="max-w-7xl mx-auto px-4 pt-6 sm:px-6 md:px-8">
      <div className="w-full flex items-center px-3 py-2.5 bg-yellow-50 rounded-lg">
        <div className="flex-shrink-0">
          <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-yellow-800">Premium plan free trial ends on {date}</p>
          <p className="mt-3 text-sm md:mt-0 md:ml-6">
            <a
              href="https://heyform.net/help"
              target="_blank"
              className="whitespace-nowrap font-medium text-yellow-700 hover:text-yellow-800"
            >
              Details <span aria-hidden="true">&rarr;</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  )
})
