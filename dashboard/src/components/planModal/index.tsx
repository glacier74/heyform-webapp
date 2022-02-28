import { Plans } from '@/pages/billing/Subscription/views/Plans'
import { useStore } from '@/store'
import { Modal } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import './index.scss'

export const PlanModal: FC = observer(() => {
  const appStore = useStore('appStore')

  function handleClose() {
    appStore.closePlanModal()
  }

  return (
    <Modal
      className="plan-modal"
      visible={appStore.isPlanModalOpen}
      showCloseIcon
      onClose={handleClose}
    >
      <div className="space-y-6">
        <div className="mt-12 mb-8">
          <h2 className="text-1xl font-extrabold text-gray-900 sm:text-2xl sm:tracking-tight lg:text-4xl">
            Upgrade your plan
          </h2>
          <p className="mt-5 text-md text-gray-500">Unlock more features.</p>
        </div>

        <Plans />
      </div>
    </Modal>
  )
})
