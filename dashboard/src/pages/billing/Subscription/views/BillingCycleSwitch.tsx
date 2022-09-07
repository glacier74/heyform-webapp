import { BillingCycleEnum, PlanModel, PlanPriceTypeEnum } from '@/models'
import type { FC } from 'react'
import { useMemo } from 'react'

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
      className="relative block rounded-lg border border-gray-300 bg-white shadow-sm p-6 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none"
      role="radio"
      aria-checked="true"
      tabIndex={0}
      onClick={handleClick}
    >
      <div className="flex items-center">
        <div className="text-sm">
          <p className="text-xl font-medium text-gray-900" id="headlessui-label-:r7:">
            {isAnnually ? 'Annually' : 'Monthly'}
          </p>
          <div className="text-gray-500">
            <p className="sm:inline">{total}</p>
            {discount > 0 && <p className="ml-2 sm:inline">- save {discount}%</p>}
          </div>
        </div>
      </div>
      <div className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right">
        <div className="text-3xl font-extrabold text-gray-900">${price}</div>
        <div className="ml-1 text-gray-500 sm:ml-0">per month</div>
      </div>
      {value === billingCycle && (
        <div
          className="border-blue-500 absolute -inset-px rounded-lg border-2 pointer-events-none"
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export const BillingCycleSwitch: FC<BillingCycleSwitchProps> = ({ value, plan, onChange }) => {
  const billingCycles = useMemo(
    () => plan.prices.filter(p => p.type === PlanPriceTypeEnum.PLAN).map(p => p.billingCycle),
    [plan]
  )
  const monthlyPrice = useMemo(
    () =>
      plan.prices.find(
        p => p.type === PlanPriceTypeEnum.PLAN && p.billingCycle === BillingCycleEnum.MONTHLY
      )?.price || 0,
    [plan]
  )
  const annuallyPrice = useMemo(
    () =>
      plan.prices.find(
        p => p.type === PlanPriceTypeEnum.PLAN && p.billingCycle === BillingCycleEnum.ANNUALLY
      )?.price || 0,
    [plan]
  )

  return (
    <div className="sm:w-1/2 lg:w-1/3">
      <div className="space-y-4">
        {billingCycles.map(billingCycle => (
          <BillingCycleItem
            key={billingCycle}
            monthlyPrice={monthlyPrice}
            annuallyPrice={annuallyPrice}
            billingCycle={billingCycle}
            value={value}
            onClick={onChange}
          />
        ))}
      </div>
    </div>
  )
}
