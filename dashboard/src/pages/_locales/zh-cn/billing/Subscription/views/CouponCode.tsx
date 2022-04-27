import { BillingCycleEnum, OrderModel, PlanModel } from '@/models'
import { PaymentService } from '@/service'
import { useParam } from '@/utils'
import { Form, Input, Modal } from '@heyforms/ui'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface CouponCodeProps extends Omit<IModalProps, 'onComplete'> {
  plan?: PlanModel | null
  billingCycle: BillingCycleEnum
  onComplete: (couponId: string, order: OrderModel) => void
}

export const CouponCode: FC<CouponCodeProps> = ({
  visible,
  plan,
  billingCycle,
  onClose,
  onComplete
}) => {
  const { workspaceId } = useParam()
  const { t } = useTranslation()

  async function handleFinish(values: IMapType) {
    const order = await PaymentService.orderPreview({
      teamId: workspaceId,
      planId: plan!.id,
      billingCycle,
      couponId: values.couponId
    })

    onComplete(values.couponId, order)
    onClose?.()
  }

  return (
    <Modal contentClassName="max-w-md" visible={visible} showCloseIcon onClose={onClose}>
      <div className="space-y-6">
        <div>
          <div className="text-lg leading-6 font-medium text-gray-900">{t('billing.addCode')}</div>
        </div>

        <Form.Custom
          submitText={t('billing.apply')}
          submitOptions={{
            type: 'primary',
            className: 'w-full'
          }}
          request={handleFinish}
        >
          <Form.Item
            name="couponId"
            label={t('billing.coupon')}
            rules={[{ required: true, message: t('billing.noCode') }]}
          >
            <Input />
          </Form.Item>
        </Form.Custom>
      </div>
    </Modal>
  )
}
