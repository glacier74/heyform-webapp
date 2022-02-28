import { BillingCycleEnum } from '@/models'
import { Switch } from '@heyforms/ui'
import type { FC } from 'react'

interface BillingCycleSwitchProps {
  value: BillingCycleEnum
  onChange: (billingCycle: BillingCycleEnum) => void
}

export const BillingCycleSwitch: FC<BillingCycleSwitchProps> = ({ value, onChange }) => {
  return (
    <div className="billing-cycle-switch">
      <div className="text-md font-medium text-gray-900 text-left">Billing Cycle</div>
      <Switch.Group
        className="mt-4 text-sm"
        value={value}
        options={[
          { value: BillingCycleEnum.MONTHLY, label: 'Monthly' },
          { value: BillingCycleEnum.ANNUALLY, label: 'Annually' }
        ]}
        onChange={onChange as any}
      />
    </div>
  )
}
