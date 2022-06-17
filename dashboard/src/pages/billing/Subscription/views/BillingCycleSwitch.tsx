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
    <div className="billing-cycle-switch">
      <div className="text-md font-medium text-gray-900 text-left">{t('billing.cycle')}</div>
      <Switch.Group
        className="mt-4 text-sm"
        value={value}
        options={[
          { value: BillingCycleEnum.MONTHLY, label: t('billing.monthly') as string },
          { value: BillingCycleEnum.ANNUALLY, label: t('billing.annually') as string }
        ]}
        onChange={onChange as any}
      />
    </div>
  )
}
