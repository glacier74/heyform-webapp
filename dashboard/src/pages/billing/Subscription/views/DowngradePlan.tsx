import { Modal, notification } from '@heyforms/ui'
import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { PlanModel } from '@/models'
import { BillingCycleEnum } from '@/models'
import { PaymentService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'

interface DowngradePlanProps extends IModalProps {
  plan?: PlanModel | null
  billingCycle: BillingCycleEnum
}

export const DowngradePlan: FC<DowngradePlanProps> = ({ visible, plan, billingCycle, onClose }) => {
  const workspaceStore = useStore('workspaceStore')
  const { workspaceId } = useParam()
  const { t } = useTranslation()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function handleConfirm() {
    setLoading(true)
    setError(null)

    try {
      const result = await PaymentService.payment({
        teamId: workspaceId,
        planId: plan!.id,
        billingCycle
      })

      if (result.note) {
        workspaceStore.updateWorkspace(workspaceId, {
          plan: plan!
        })

        notification.success({
          title: result.note
        })
        onClose?.()
      }
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  return (
    <Modal.Confirm
      type="danger"
      visible={visible}
      title={t('billing.downGrade')}
      description={
        <div className="space-y-6">
          <p>{t('billing.downText')}</p>
          {error && <div className="form-item-error">{error.message}</div>}
        </div>
      }
      cancelLabel={t('project.trash.cancel')}
      confirmLabel={t('billing.Downgrade')}
      confirmDisabled={loading}
      confirmLoading={loading}
      onCancel={onClose}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  )
}
