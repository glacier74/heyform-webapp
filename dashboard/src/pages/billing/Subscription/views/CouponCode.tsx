import { BillingCycleEnum, PlanModel } from '@/models'
import { PaymentService } from '@/service'
import { useParam } from '@/utils'
import { Form, Input, Modal } from '@heyforms/ui'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface CouponCodeProps extends Omit<IModalProps, 'onComplete'> {
  plan?: PlanModel | null
  billingCycle: BillingCycleEnum
  onComplete: (couponInfo: IMapType) => void
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
    const result = await PaymentService.applyCoupon({
      teamId: workspaceId,
      planId: plan!.id,
      billingCycle,
      code: values.code
    })
    onComplete({
      code: values.code,
      ...result
    })
    onClose?.()
  }

  return (
    <Modal contentClassName="max-w-md" visible={visible} showCloseIcon onClose={onClose}>
      <div className="space-y-6">
        <div>
          <div className="text-lg leading-6 font-medium text-slate-900">{t('billing.addCode')}</div>
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
            name="code"
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
