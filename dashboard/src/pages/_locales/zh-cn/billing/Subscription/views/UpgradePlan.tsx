import type { OrderModel, PlanModel } from '@/models'
import { BillingCycleEnum, ZhCnPaymentMethodEnum } from '@/models'
import { PaymentMethodSwitch } from '@/pages/_locales/zh-cn/billing/Subscription/views/PaymentMethodSwitch'
import { PaymentService } from '@/service'
import { useParam, useVisible } from '@/utils'
import { Button, Modal } from '@heyforms/ui'
import { isNil } from '@hpnp/utils/helper'
import Big from 'big.js'
import type { FC } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CouponCode } from './CouponCode'

interface UpgradePlanProps extends IModalProps {
  plan?: PlanModel | null
  order?: OrderModel | null
  billingCycle: BillingCycleEnum
}

const BILLING_CYCLE_MAPS: any = {
  [BillingCycleEnum.MONTHLY]: 'billing.Monthly',
  [BillingCycleEnum.ANNUALLY]: 'billing.Annually'
}

export function unitConversion(amount?: number) {
  if (!isNil(amount)) {
    return Big(amount!).div(100).toFixed(2)
  }
}

export const UpgradePlan: FC<UpgradePlanProps> = ({
  visible,
  plan,
  order: rawOrder,
  billingCycle,
  onClose
}) => {
  const { workspaceId } = useParam()
  const { t } = useTranslation()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [order, setOrder] = useState<OrderModel>(rawOrder as OrderModel)

  const [couponCodeVisible, openCouponCode, closeCouponCode] = useVisible()
  const [couponId, setCouponId] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<ZhCnPaymentMethodEnum>(
    ZhCnPaymentMethodEnum.WECHAT_PAY
  )

  const price = useMemo(() => {
    const unit = new Big(plan?.prices.find(row => row.billingCycle === billingCycle)?.price || 0)
    const monthly = unit.toFixed(2)
    let total = monthly

    if (billingCycle === BillingCycleEnum.ANNUALLY) {
      total = unit.times(12).toFixed(2)
    }

    return {
      monthly,
      total
    }
  }, [plan, billingCycle])

  function handleCouponCodeComplete(newCouponId: string, newOrder: OrderModel) {
    setCouponId(newCouponId)
    setOrder(newOrder)
  }

  async function handleClick() {
    if (loading) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      window.location.href = await PaymentService.payment({
        teamId: workspaceId,
        planId: plan!.id,
        billingCycle,
        couponId,
        paymentMethod
      })
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (rawOrder) {
      setOrder(rawOrder)
    }
  }, [rawOrder])

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
                  ¥{price.monthly} / {t('billing.perMonth')} · {t(BILLING_CYCLE_MAPS[billingCycle])}
                </p>
              </div>
              <div className="flex-shrink-0 whitespace-nowrap text-sm text-gray-900">
                ¥{price.total}
              </div>
            </div>
          </div>

          <div className="py-4 border-b border-gray-100">
            <div className="flex justify-between text-sm text-gray-500">
              <span>{t('billing.Subtotal')}</span>
              <span>¥{unitConversion(order?.amount)}</span>
            </div>
            {order && order.seatCount! > 0 && (
              <div className="mt-1 flex justify-between text-sm text-gray-500">
                <span>
                  {t('billing.plans.AdditionalSeats')} x{order?.seatCount}
                </span>
                <span>¥{unitConversion(order?.seatsAmount)}</span>
              </div>
            )}
            {couponId && (
              <div className="mt-1 flex justify-between text-sm text-gray-500">
                <span className="flex items-center">
                  <span>{t('billing.Discount')}</span>
                  <span className="ml-2">{couponId}</span>
                </span>
                <span className="text-green-600">-¥{unitConversion(order?.discount)}</span>
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
              <span>¥{unitConversion(order?.total)}</span>
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
