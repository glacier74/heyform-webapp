import { Plans } from '@/pages/billing/Subscription/views/Plans'
import { useStore } from '@/store'
import { Modal } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import './index.scss'

export const PlanModal: FC = observer(() => {
  const appStore = useStore('appStore')
  const { t } = useTranslation()

  function handleClose() {
    appStore.isPlanModalOpen = false
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
          <img src="https://forms.b-cdn.net/website/upgrade.png" className="w-72 mx-auto"></img>
          <h2 className="font-bold text-gray-900 sm:text-2xl sm:tracking-tight lg:text-3xl text-center">
            {t('billing.Upgrade')}
          </h2>
          <p className="max-w-3xl mx-auto mt-2 text-lg text-gray-500 text-center">{t('billing.Unlock')}</p>
        </div>

        <Plans />
      </div>
    </Modal>
  )
})
