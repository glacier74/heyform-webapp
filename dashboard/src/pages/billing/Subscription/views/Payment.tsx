import type { PlanModel } from '@/models'
import { BillingCycleEnum } from '@/models'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { PlanItem } from './PlanItem'

interface PaymentProps {
  plan: PlanModel
  billingCycle: BillingCycleEnum
  onUpgrade: (plan: PlanModel) => void
  onDowngrade: (plan: PlanModel) => void
}

const BILLING_CYCLE_MAPS: any = {
  [BillingCycleEnum.MONTHLY]: 'mo',
  [BillingCycleEnum.ANNUALLY]: 'yr'
}

export const Payment = observer(({ plan, billingCycle, onUpgrade, onDowngrade }: PaymentProps) => {
  const workspaceStore = useStore('workspaceStore')
  const price = useMemo(
    () => plan.prices.find(row => row.billingCycle === billingCycle)?.price || 0,
    [plan, billingCycle]
  )

  return (
    <div className="flex items-center justify-center">
      <PlanItem
        plan={plan}
        billingCycle={billingCycle}
        workspace={workspaceStore.workspace}
        onUpgrade={onUpgrade}
        onDowngrade={onDowngrade}
      />
    </div>
  )
})
