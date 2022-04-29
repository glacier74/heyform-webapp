import { Locale } from '@/locales'
import { Plans as ZhCnPlans } from '@/pages/_locales/zh-cn/billing/Subscription/views/Plans'
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
          <h2 className="text-1xl font-extrabold text-gray-900 sm:text-2xl sm:tracking-tight lg:text-4xl">
            {t('billing.Upgrade')}
          </h2>
          <p className="mt-5 text-md text-gray-500">{t('billing.Unlock')}</p>
        </div>

        {Locale.isZhCn ? <ZhCnPlans /> : <Plans />}
      </div>
    </Modal>
  )
})
