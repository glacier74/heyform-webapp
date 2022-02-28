import { BillingCycleEnum, PlanModel } from '@/models'
import { PaymentService } from '@/service'
import { useParam } from '@/utils'
import { Form, Input, Modal } from '@heyforms/ui'
import type { FC } from 'react'

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
          <div className="text-lg leading-6 font-medium text-gray-900">Add coupon code</div>
        </div>

        <Form.Custom
          submitText="Apply"
          submitOptions={{
            type: 'primary',
            className: 'w-full'
          }}
          request={handleFinish}
        >
          <Form.Item
            name="code"
            label="Coupon code"
            rules={[{ required: true, message: "Coupon code can't be empty" }]}
          >
            <Input />
          </Form.Item>
        </Form.Custom>
      </div>
    </Modal>
  )
}
