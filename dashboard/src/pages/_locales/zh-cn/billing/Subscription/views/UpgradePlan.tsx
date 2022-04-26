import type { OrderModel, PlanModel } from '@/models'
import { BillingCycleEnum, ZhCnPaymentMethodEnum } from '@/models'
import { PaymentMethodSwitch } from '@/pages/_locales/zh-cn/billing/Subscription/views/PaymentMethodSwitch'
import { PaymentService } from '@/service'
import { useStore } from '@/store'
import { useParam, useVisible } from '@/utils'
import { Button, Modal } from '@heyforms/ui'
import Big from 'big.js'
import type { FC } from 'react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CouponCode } from './CouponCode'

interface UpgradePlanProps extends IModalProps {
  plan?: PlanModel | null
  order?: OrderModel | null
  billingCycle: BillingCycleEnum
}

const BILLING_CYCLE_MAPS: any = {
  [BillingCycleEnum.MONTHLY]: 'monthly',
  [BillingCycleEnum.ANNUALLY]: 'annually'
}

export const UpgradePlan: FC<UpgradePlanProps> = ({
  visible,
  plan,
  order,
  billingCycle,
  onClose
}) => {
  const { workspaceId } = useParam()
  const { t } = useTranslation()

  const workspaceStore = useStore('workspaceStore')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const [couponCodeVisible, openCouponCode, closeCouponCode] = useVisible()
  const [discount, setDiscount] = useState<Big | null>(null)
  const [couponCode, setCouponCode] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<ZhCnPaymentMethodEnum>(
    ZhCnPaymentMethodEnum.WECHAT_PAY
  )

  const price = useMemo(() => {
    const unit = new Big(plan?.prices.find(row => row.billingCycle === billingCycle)?.price || 0)

    if (billingCycle === BillingCycleEnum.MONTHLY) {
      return unit
    }

    return unit.times(12)
  }, [plan, billingCycle])

  function handleCouponCodeComplete(couponInfo: IMapType) {
    setCouponCode(couponInfo.code)

    if (couponInfo.amountOff) {
      setDiscount(new Big(couponInfo.amountOff))
    } else if (couponInfo.percentOff) {
      setDiscount(new Big(couponInfo.percentOff).div(100).times(price))
    }
  }

  async function handleClick() {
    setLoading(true)
    setError(null)

    try {
      const result = await PaymentService.payment({
        teamId: workspaceId,
        planId: plan!.id,
        billingCycle,
        couponId: couponCode,
        paymentMethod
      })
      console.log(result)
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  return (
    <>
      <Modal contentClassName="max-w-md" visible={visible} showCloseIcon onClose={onClose}>
        <div>
          <div>
            <div className="text-lg leading-6 font-medium text-gray-900">{t('billing.upPlan')}</div>
          </div>

          <div className="py-4 border-b border-gray-100">
            <div className="flex justify-between space-x-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {order?.planName} {t('billing.plan')}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {t('billing.Billed')} {t(BILLING_CYCLE_MAPS[billingCycle])}
                </p>
              </div>
              <div className="flex-shrink-0 whitespace-nowrap text-sm text-gray-900">
                ¥{price.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="py-4 border-b border-gray-100">
            <div className="flex justify-between text-sm text-gray-500">
              <span>{t('billing.Subtotal')}</span>
              <span>¥{order?.amount}</span>
            </div>
            {order?.discount && order!.discount! > 0 && (
              <div className="mt-1 flex justify-between text-sm text-gray-500">
                <span>{t('billing.Discount')}</span>
                <span className="text-green-600">-¥{order?.discount}</span>
              </div>
            )}
          </div>

          <div className="py-4 border-b border-gray-100">
            {/*<div className="flex justify-between text-sm text-gray-700">*/}
            {/*  <Button.Link className="underline" onClick={openCouponCode}>*/}
            {/*    {t('billing.add')}*/}
            {/*  </Button.Link>*/}
            {/*</div>*/}
            <div className="mt-2 flex justify-between text-sm text-gray-900">
              <span>{t('billing.total')}</span>
              <span>¥{order?.total}</span>
            </div>
          </div>

          <div className="py-4 border-b border-gray-100">
            <PaymentMethodSwitch value={paymentMethod} onChange={setPaymentMethod} />
          </div>

          <Button className="w-full" type="primary" loading={loading} onClick={handleClick}>
            {t('billing.bottom')}
          </Button>

          {error && <p className="text-xs text-red-500">{error.message}</p>}
        </div>
      </Modal>

      <CouponCode
        visible={couponCodeVisible}
        plan={plan}
        billingCycle={billingCycle}
        onClose={closeCouponCode}
        onComplete={handleCouponCodeComplete}
      />
    </>
  )
}
