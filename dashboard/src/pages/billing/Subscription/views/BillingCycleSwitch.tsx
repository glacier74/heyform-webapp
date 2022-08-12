import { BillingCycleEnum } from '@/models'
import { Switch } from '@heyforms/ui'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface BillingCycleSwitchProps {
  value: BillingCycleEnum
  onChange: (billingCycle: BillingCycleEnum) => void
}

export const BillingCycleSwitch: FC<BillingCycleSwitchProps> = ({ value, onChange }) => {
  const { t } = useTranslation()
  return (
    <div className="max-w-2xl mx-auto">
      
      <label className="relative block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none">
        <input type="radio" name="billingCycle" value={BillingCycleEnum.MONTHLY} className="sr-only"></input>
        <div className="flex items-center">
          <div className="text-xl font-semibold sm:inline">{t('billing.monthly')}</div>
          <span className="text-sm sm:inline">$49.9/month</span>
        </div>
        <div className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right">
          <span className="text-3xl font-bold">$49.9</span>
          <span className="text-sm">per month</span>
        </div>
      </label>

      <label className="relative block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none">
        <input type="radio" name="billingCycle" value={BillingCycleEnum.ANNUALLY} className="sr-only"></input>
        <div className="flex items-center">
          <div className="text-xl font-semibold sm:inline">{t('billing.annually')}</div>
          <span className="text-sm sm:inline">$499/year</span>
        </div>
        <div className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right">
          <span className="text-3xl font-bold">$42</span>
          <span className="text-sm">per month</span>
        </div>
      </label>
    </div>


  )
}
