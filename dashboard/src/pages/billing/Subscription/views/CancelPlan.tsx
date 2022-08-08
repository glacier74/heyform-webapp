import { PaymentService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'
import { Modal } from '@heyforms/ui'
import { timestamp, unixDate } from '@hpnp/utils'
import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const CancelPlan: FC<IModalProps> = ({ visible, onClose }) => {
  const { t } = useTranslation()
  const workspaceStore = useStore('workspaceStore')
  const { plan, subscription } = workspaceStore.workspace!
  const { workspaceId } = useParam()
  const endAt = unixDate(subscription.endAt).format('MMM DD, YYYY')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function handleConfirm() {
    setLoading(true)
    setError(null)

    try {
      await PaymentService.cancelSubscription(workspaceId)

      workspaceStore.updateWorkspace(workspaceId, {
        subscription: {
          ...subscription,
          canceledAt: timestamp()
        }
      })

      onClose?.()
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  return (
    <Modal.Confirm
      type="danger"
      visible={visible}
      title={t('billing.cancelHead')}
      description={
        <div className="space-y-2">
          <p>{t('billing.cancelText', { planName: plan.name, endAt })}</p>
          <p>{t('billing.cancelText2')}</p>
          {error && <div className="form-item-error mt-4">{error.message}</div>}
        </div>
      }
      cancelLabel={t('billing.close')}
      confirmLabel={t('billing.cancelConfirm')}
      confirmDisabled={loading}
      confirmLoading={loading}
      onCancel={onClose}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  )
}
