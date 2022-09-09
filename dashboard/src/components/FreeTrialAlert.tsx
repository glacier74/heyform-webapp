import { useStore } from '@/store'
import { InformationCircleIcon } from '@heroicons/react/solid'
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
    <div className="bg-blue-50 p-4">
      <div className="flex max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex-shrink-0">
          <InformationCircleIcon className="h-5 w-5 text-blue-500" />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-blue-700">Premium plan free trial ends on {date}</p>
          <p className="mt-3 text-sm md:mt-0 md:ml-6">
            <a
              href="https://heyform.net/help"
              target="_blank"
              className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
            >
              Details <span aria-hidden="true">&rarr;</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  )
})
