import { observer } from 'mobx-react-lite'

import type { PlanModel } from '@/models'
import { BillingCycleEnum } from '@/models'
import { useStore } from '@/store'

import { PlanItem } from './PlanItem'

interface PaymentProps {
  plan: PlanModel
  billingCycle: BillingCycleEnum
  onUpgrade: (plan: PlanModel) => void
  onDowngrade: (plan: PlanModel) => void
}

export const Payment = observer(({ plan, billingCycle, onUpgrade, onDowngrade }: PaymentProps) => {
  const workspaceStore = useStore('workspaceStore')

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
