import type { PlanModel } from '@/models'
import { BillingCycleEnum } from '@/models'
import { useStore } from '@/store'
import { useVisible } from '@/utils'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { BillingCycleSwitch } from './BillingCycleSwitch'
import { DowngradePlan } from './DowngradePlan'
import { PlanItem } from './PlanItem'
import { UpgradePlan } from './UpgradePlan'


export const Payment = observer(() => {
  const workspaceStore = useStore('workspaceStore')


  const [plan, setPlan] = useState<PlanModel | null>(null)
  const [billingCycle, setBillingCycle] = useState<BillingCycleEnum>(
    workspaceStore.workspace?.subscription.billingCycle || BillingCycleEnum.ANNUALLY
  )

  const [upgradePlanVisible, openUpgradePlan, closeUpgradePlan] = useVisible()
  const [downgradePlanVisible, openDowngradePlan, closeDowngradePlan] = useVisible()

  function handleUpgrade(selected: PlanModel) {
    setPlan(selected)
    openUpgradePlan()
  }

  function handleDowngrade(selected: PlanModel) {
    setPlan(selected)
    openDowngradePlan()
  }

  return (
    <>
      <tr>
        <th className="py-8 text-sm font-medium text-gray-900 text-left align-top" scope="row">
          <BillingCycleSwitch value={billingCycle} onChange={setBillingCycle}/>
        </th>

        {workspaceStore.plans.map(row => (
          <PlanItem
            key={row.id}
            plan={row}
            billingCycle={billingCycle}
            workspace={workspaceStore.workspace}
            onUpgrade={handleUpgrade}
            onDowngrade={handleDowngrade}
          />
        ))}
      </tr>

      {/* Upgrade with coupon apply */}
      <UpgradePlan
        visible={upgradePlanVisible}
        plan={plan}
        billingCycle={billingCycle}
        onClose={closeUpgradePlan}
      />

      {/* Downgrade confirm */}
      <DowngradePlan
        visible={downgradePlanVisible}
        plan={plan}
        billingCycle={billingCycle}
        onClose={closeDowngradePlan}
      />
    </>
  )
})
