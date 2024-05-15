import { Button, Modal } from '@heyforms/ui'
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
      <div className="space-y-6 py-20">
        <div className="my-4">
          <h1 className="text-center text-3xl font-bold text-slate-900 sm:tracking-tight">
            {t('billing.Upgrade')}
          </h1>
          <p className="mx-auto mt-2 max-w-3xl text-center text-base text-slate-500">
            {t('billing.Unlock')}
          </p>
        </div>

        <Plans />

        <div className="mt-40 flex items-center justify-center">
          <Button.Link className="!text-xs !text-slate-900/40" onClick={handleClose}>
            {t('billing.keepFreePlan')}
          </Button.Link>
        </div>
      </div>
    </Modal>
  )
})
