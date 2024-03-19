import { Modal } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Plans } from '@/pages/billing/Subscription/views/Plans'
import { useStore } from '@/store'

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
        <div className="my-4">
          <img src="https://forms.b-cdn.net/website/upgrade.png" className="mx-auto w-48"></img>
          <h1 className="text-center text-2xl font-bold text-slate-900 sm:tracking-tight">
            {t('billing.Upgrade')}
          </h1>
          <p className="mx-auto mt-2 max-w-3xl text-center text-base text-slate-500">
            {t('billing.Unlock')}
          </p>
        </div>

        <Plans />
      </div>
    </Modal>
  )
})
