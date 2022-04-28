import type { PlanModel } from '@/models'
import { BillingCycleEnum, OrderModel } from '@/models'
import { BillingCycleSwitch } from '@/pages/billing/Subscription/views/BillingCycleSwitch'
import { useStore } from '@/store'
import { useVisible } from '@/utils'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { DowngradePlan } from './DowngradePlan'
import { PlanItem } from './PlanItem'
import { UpgradePlan } from './UpgradePlan'

export const Payment = observer(() => {
  const workspaceStore = useStore('workspaceStore')

  const [plan, setPlan] = useState<PlanModel | null>(null)
  const [order, setOrder] = useState<OrderModel | null>(null)
  const [isRenewal, setIsRenewal] = useState(false)

  const [billingCycle, setBillingCycle] = useState<BillingCycleEnum>(
    workspaceStore.workspace?.subscription.billingCycle || BillingCycleEnum.ANNUALLY
  )

  const [upgradePlanVisible, openUpgradePlan, closeUpgradePlan] = useVisible()
  const [downgradePlanVisible, openDowngradePlan, closeDowngradePlan] = useVisible()

  function handleUpgrade(selected: PlanModel, orderDetail: OrderModel) {
    setPlan(selected)
    setOrder(orderDetail)
    setIsRenewal(false)
    openUpgradePlan()
  }

  function handleRenew(selected: PlanModel, orderDetail: OrderModel) {
    setPlan(selected)
    setOrder(orderDetail)
    setIsRenewal(true)
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
          <BillingCycleSwitch value={billingCycle} onChange={setBillingCycle} />
        </th>

        {workspaceStore.plans.map(row => (
          <PlanItem
            key={row.id}
            plan={row}
            billingCycle={billingCycle}
            workspace={workspaceStore.workspace}
            onUpgrade={handleUpgrade}
            onRenew={handleRenew}
            onDowngrade={handleDowngrade}
          />
        ))}
      </tr>

      {/* Upgrade with coupon apply */}
      <UpgradePlan
        visible={upgradePlanVisible}
        plan={plan}
        order={order}
        billingCycle={billingCycle}
        isRenewal={isRenewal}
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
