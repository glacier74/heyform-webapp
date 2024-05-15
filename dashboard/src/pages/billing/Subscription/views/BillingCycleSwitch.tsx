import type { FC } from 'react'
import { useMemo } from 'react'

import { BillingCycleEnum, PlanModel, PlanPriceTypeEnum } from '@/models'

interface BillingCycleSwitchProps {
  value: BillingCycleEnum
  plan: PlanModel
  onChange: (billingCycle: BillingCycleEnum) => void
}

interface BillingCycleItemProp {
  monthlyPrice: number
  annuallyPrice: number
  billingCycle: BillingCycleEnum
  value?: BillingCycleEnum
  onClick: (value: BillingCycleEnum) => void
}

const BillingCycleItem: FC<BillingCycleItemProp> = ({
  value = BillingCycleEnum.ANNUALLY,
  billingCycle,
  monthlyPrice,
  annuallyPrice,
  onClick
}) => {
  const isAnnually = useMemo(() => billingCycle === BillingCycleEnum.ANNUALLY, [billingCycle])
  const price = useMemo(
    () => (isAnnually ? annuallyPrice : monthlyPrice),
    [monthlyPrice, annuallyPrice, isAnnually]
  )
  const total = useMemo(() => {
    if (isAnnually) {
      return `$${(price * 100 * 12) / 100}/year`
    }

    return `$${price}/month`
  }, [price, isAnnually])
  const discount = useMemo(
    () => (isAnnually ? Math.round(((monthlyPrice - annuallyPrice) * 100) / monthlyPrice) : 0),
    [monthlyPrice, annuallyPrice, isAnnually]
  )

  function handleClick() {
    onClick(billingCycle)
  }

  return (
    <div
      className="relative block cursor-pointer rounded-lg border border-gray-300 bg-white p-6 shadow-sm hover:border-gray-400 focus:outline-none sm:flex sm:justify-between"
      role="radio"
      aria-checked="true"
      tabIndex={0}
      onClick={handleClick}
    >
      <div className="flex items-center">
        <div className="text-sm">
          <p className="text-xl font-medium text-slate-900">
            {isAnnually ? 'Annually' : 'Monthly'}
          </p>
          <div className="text-slate-500">
            <p className="sm:inline">{total}</p>
            {discount > 0 && <p className="ml-2 sm:inline">- save {discount}%</p>}
          </div>
        </div>
      </div>
      <div className="mt-2 flex text-sm sm:mt-0 sm:ml-4 sm:block sm:text-right">
        <div className="text-3xl font-extrabold text-slate-900">${price}</div>
        <div className="ml-1 text-slate-500 sm:ml-0">per month</div>
      </div>
      {value === billingCycle && (
        <div
          className="pointer-events-none absolute -inset-px rounded-lg border-2 border-blue-500"
          aria-hidden="true"
        />
      )}
    </div>
  )
}
