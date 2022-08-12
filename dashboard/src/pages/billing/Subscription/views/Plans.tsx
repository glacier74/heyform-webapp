import { BillingCycleEnum, PlanModel } from '@/models'
import { BillingCycleSwitch } from '@/pages/billing/Subscription/views/BillingCycleSwitch'
import { DowngradePlan } from '@/pages/billing/Subscription/views/DowngradePlan'
import { Payment } from '@/pages/billing/Subscription/views/Payment'
import { UpgradePlan } from '@/pages/billing/Subscription/views/UpgradePlan'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect, useVisible } from '@/utils'
import { CheckIcon } from '@heroicons/react/outline'
import { useState } from 'react'

export const Plans = () => {
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

  useAsyncEffect(async () => {
    const result = await WorkspaceService.plans()
    workspaceStore.setPlans(result)
  })

  return (
    <div className="p-16">
      <div className="flex items-center justify-center mb-8">
        <BillingCycleSwitch value={billingCycle} onChange={setBillingCycle} />
        {workspaceStore.plans.length > 0 && (
            <Payment
              plan={workspaceStore.plans[1]}
              billingCycle={billingCycle}
              onUpgrade={handleUpgrade}
              onDowngrade={handleDowngrade}
            />
          )}
      </div>

      <div>
        <ul className="grid grid-cols-3 gap-4 text-lg mb-12">
          <li>
            <CheckIcon className="inline w-5 h-5 mr-2" />
            Team collaboration
          </li>
          <li>
            <CheckIcon className="inline w-5 h-5 mr-2" />
            Connect custom domain
          </li>
          <li>
            <CheckIcon className="inline w-5 h-5 mr-2" />
            Remove HeyForm branding
          </li>
          <li>
            <CheckIcon className="inline w-5 h-5 mr-2" />
            Theme customization
          </li>
          <li>
            <CheckIcon className="inline w-5 h-5 mr-2" />
            Custom meta description
          </li>
          <li>
            <CheckIcon className="inline w-5 h-5 mr-2" />
            Custom email to audience
          </li>
          <li>
            <CheckIcon className="inline w-5 h-5 mr-2" />
            Hidden fields
          </li>
          <li>
            <CheckIcon className="inline w-5 h-5 mr-2" />
            Custom auto responses
          </li>
          <li>
            <CheckIcon className="inline w-5 h-5 mr-2" />
            API access
          </li>
        </ul>
      </div>

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
}
