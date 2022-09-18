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
          <p className="text-xl font-medium text-slate-900">
            {isAnnually ? 'Annually' : 'Monthly'}
          </p>
          <div className="text-slate-500">
            <p className="sm:inline">{total}</p>
            {discount > 0 && <p className="ml-2 sm:inline">- save {discount}%</p>}
          </div>
        </div>
      </div>
      <div className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right">
        <div className="text-3xl font-extrabold text-slate-900">${price}</div>
        <div className="ml-1 text-slate-500 sm:ml-0">per month</div>
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

export const BillingCycleSwitchSkeleton = () => {
  const billingCycles = ['Annually', 'Monthly']

  return (
    <div className="flex items-center justify-center mb-8">
      <div className="sm:w-1/2 lg:w-1/3">
        <div className="space-y-4">
          {billingCycles.map((billingCycle, index) => (
            <div
              key={index}
              className="relative block rounded-lg border border-gray-300 bg-white shadow-sm p-6 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none"
              role="radio"
              aria-checked="true"
              tabIndex={0}
            >
              <div className="flex items-center">
                <div className="text-sm">
                  <p className="text-xl font-medium text-slate-900">{billingCycle}</p>
                  <div className="mt-2 text-slate-500">
                    <p className="w-16 h-4 skeleton"></p>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right">
                <div className="w-24 h-6 skeleton text-3xl font-extrabold text-slate-900"></div>
                <div className="ml-1 text-slate-500 sm:ml-0">per month</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const BillingCycleSwitch: FC<BillingCycleSwitchProps> = ({ value, plan, onChange }) => {
  const prices = useMemo(() => plan?.prices || [], [plan])
  const billingCycles = useMemo(
    () => prices.filter(p => p.type === PlanPriceTypeEnum.PLAN).map(p => p.billingCycle),
    [prices]
  )
  const monthlyPrice = useMemo(
    () =>
      prices.find(
        p => p.type === PlanPriceTypeEnum.PLAN && p.billingCycle === BillingCycleEnum.MONTHLY
      )?.price || 0,
    [prices]
  )
  const annuallyPrice = useMemo(
    () =>
      prices.find(
        p => p.type === PlanPriceTypeEnum.PLAN && p.billingCycle === BillingCycleEnum.ANNUALLY
      )?.price || 0,
    [prices]
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
