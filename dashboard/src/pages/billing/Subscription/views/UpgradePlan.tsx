import { Button, Modal, notification } from '@heyforms/ui'
import Big from 'big.js'
import type { FC } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { PlanModel } from '@/models'
import { BillingCycleEnum } from '@/models'
import { PaymentService } from '@/service'
import { useStore } from '@/store'
import { redirectToStripeCheckout, useParam, useVisible } from '@/utils'

import { CouponCode } from './CouponCode'

interface ContainerProps extends Pick<IModalProps, 'onClose'> {
  plan?: PlanModel | null
  billingCycle: BillingCycleEnum
}

const BILLING_CYCLE_MAPS: any = {
  [BillingCycleEnum.MONTHLY]: 'monthly',
  [BillingCycleEnum.ANNUALLY]: 'annually'
}

const Container: FC<ContainerProps> = ({ plan, billingCycle, onClose }) => {
  const { workspaceId } = useParam()
  const workspaceStore = useStore('workspaceStore')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [couponCodeVisible, openCouponCode, closeCouponCode] = useVisible()

  const [discount, setDiscount] = useState<Big | null>(null)
  const [couponCode, setCouponCode] = useState<string | null>(null)
  const { t } = useTranslation()

  const price = useMemo(() => {
    const unitPrice = new Big(
      plan?.prices.find(row => row.billingCycle === billingCycle)?.price || 0
    )

    if (billingCycle === BillingCycleEnum.ANNUALLY) {
      return unitPrice.times(12)
    }

    return unitPrice
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
        code: couponCode
      })

      if (result.note) {
        workspaceStore.updateWorkspace(workspaceId, {
          plan: plan!
        })

        notification.success({
          title: result.note
        })
        return onClose?.()
      }

      await redirectToStripeCheckout(result.sessionId)
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    return () => {
      setDiscount(null)
      setCouponCode(null)
    }
  }, [])

  return (
    <>
      <div>
        <div>
          <div className="text-lg font-medium leading-6 text-slate-900">{t('billing.upPlan')}</div>
        </div>

        <div className="border-b border-gray-100 py-4">
          <div className="flex justify-between space-x-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-medium text-slate-900">
                {plan?.name} {t('billing.plan')}
              </p>
              <p className="truncate text-sm text-slate-500">
                {t(BILLING_CYCLE_MAPS[billingCycle])}
              </p>
            </div>
            <div className="flex-shrink-0 whitespace-nowrap text-sm text-slate-900">
              ${price.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="border-b border-gray-100 py-4">
          <div className="flex justify-between text-sm text-slate-500">
            <span>{t('billing.Subtotal')}</span>
            <span>${price.toFixed(2)}</span>
          </div>
          {discount && (
            <div className="mt-1 flex justify-between text-sm text-slate-500">
              <span>{t('billing.Discount')}</span>
              <span className="text-green-600">-${discount.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="py-4">
          <div className="flex justify-between text-sm text-slate-700">
            <Button.Link className="underline" onClick={openCouponCode}>
              {t('billing.add')}
            </Button.Link>
          </div>
          <div className="mt-2 flex justify-between text-sm text-slate-900">
            <span>{t('billing.total')}</span>
            {discount ? (
              <span>${price.minus(discount).toFixed(2)}</span>
            ) : (
              <span>${price.toFixed(2)}</span>
            )}
          </div>
        </div>

        <Button className="w-full" type="primary" loading={loading} onClick={handleClick}>
          {t('billing.bottom')}
        </Button>

        {error && <p className="text-xs text-red-500">{error.message}</p>}
      </div>

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

export const UpgradePlan: FC<ContainerProps & IModalProps> = ({
  visible,
  plan,
  billingCycle,
  onClose
}) => {
  return (
    <Modal contentClassName="max-w-md" visible={visible} showCloseIcon onClose={onClose}>
      <Container plan={plan} billingCycle={billingCycle} onClose={onClose} />
    </Modal>
  )
}
