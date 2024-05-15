import { Spin, Switch } from '@heyforms/ui'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Async } from '@/components'
import { BillingCycleEnum, PlanModel } from '@/models'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useVisible } from '@/utils'

import { DowngradePlan } from './DowngradePlan'
import { Payment } from './Payment'
import { UpgradePlan } from './UpgradePlan'

export const Plans = observer(() => {
  const { t } = useTranslation()
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

  async function fetchPlans() {
    const result = await WorkspaceService.plans()
    workspaceStore.setPlans(result)
    return false
  }

  function handleBillingCycleChange(value: boolean) {
    setBillingCycle(value ? BillingCycleEnum.ANNUALLY : BillingCycleEnum.MONTHLY)
  }

  return (
    <div className="p-4">
      <Async request={fetchPlans} skeleton={<Spin />} cacheFirst>
        <div className="mb-8 flex items-center justify-center gap-4 text-sm text-slate-600">
          <span>{t('billing.Monthly')}</span>
          <Switch
            value={billingCycle === BillingCycleEnum.ANNUALLY}
            onChange={handleBillingCycleChange}
          />
          <span>
            <span>{t('billing.Annually')}</span>
            <span className="pl-2 text-xs text-red-500">({t('billing.save16')})</span>
          </span>
        </div>

        {workspaceStore.plans.length > 0 && (
          <Payment
            plans={workspaceStore.plans}
            billingCycle={billingCycle}
            onUpgrade={handleUpgrade}
            onDowngrade={handleDowngrade}
          />
        )}
      </Async>

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
    </div>
  )
})
