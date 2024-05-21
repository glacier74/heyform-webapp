import { observer } from 'mobx-react-lite'

import type { PlanModel } from '@/models'
import { BillingCycleEnum } from '@/models'
import { useStore } from '@/store'

import { PlanItem } from './PlanItem'

interface PaymentProps {
  plans: PlanModel[]
  billingCycle: BillingCycleEnum
  onUpgrade: (plan: PlanModel) => void
  onDowngrade: (plan: PlanModel) => void
}

export const Payment = observer(({ plans, billingCycle, onUpgrade, onDowngrade }: PaymentProps) => {
  const workspaceStore = useStore('workspaceStore')

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:justify-center">
      {plans.map(plan => (
        <PlanItem
          key={plan.id}
          plan={plan}
          billingCycle={billingCycle}
          workspace={workspaceStore.workspace}
          onUpgrade={onUpgrade}
          onDowngrade={onDowngrade}
        />
      ))}
    </div>
  )
})
