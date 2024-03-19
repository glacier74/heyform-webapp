import {
  IconBrush,
  IconEyeOff,
  IconFile,
  IconGlobe,
  IconMail,
  IconMessageReply,
  IconPencil,
  IconServer,
  IconUsers
} from '@tabler/icons-react'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import { Async } from '@/components'
import { BillingCycleEnum, PlanModel } from '@/models'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useVisible } from '@/utils'

import { BillingCycleSwitch, BillingCycleSwitchSkeleton } from './BillingCycleSwitch'
import { DowngradePlan } from './DowngradePlan'
import { Payment } from './Payment'
import { UpgradePlan } from './UpgradePlan'

export const Plans = observer(() => {
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

  return (
    <div className="p-4">
      <Async request={fetchPlans} skeleton={<BillingCycleSwitchSkeleton />} cacheFirst>
        <div className="mb-8 flex items-center justify-center">
          <BillingCycleSwitch
            plan={workspaceStore.plans[1]}
            value={billingCycle}
            onChange={setBillingCycle}
          />
        </div>
      </Async>

      {workspaceStore.plans.length > 0 && (
        <Payment
          plan={workspaceStore.plans[1]}
          billingCycle={billingCycle}
          onUpgrade={handleUpgrade}
          onDowngrade={handleDowngrade}
        />
      )}

      <div className="mt-12">
        <ul className="mb-12 grid grid-cols-3 gap-4 text-lg">
          <li className="mb-4">
            <IconUsers className="mr-2 mb-2 inline h-8 w-8 text-slate-500" />
            <h3 className="text-lg font-medium">Team collaboration</h3>
            <p className="text-base text-slate-500">
              Invite team members to co-create forms and streamline data collection experiences that
              meet organizational needs and goals.
            </p>
          </li>
          <li className="mb-4">
            <IconGlobe className="mr-2 mb-2 inline h-8 w-8 text-slate-500" />
            <h3 className="text-lg font-medium">Connect custom domain</h3>
            <p className="text-base text-slate-500">
              Add your own domains (or subdomains) to your forms and create SEO-friendly pretty
              URLs. We take care of hosting and SSL certificates for you.
            </p>
          </li>
          <li className="mb-4">
            <IconPencil className="mr-2 mb-2 inline h-8 w-8 text-slate-500" />
            <h3 className="text-lg font-medium">Remove HeyForm branding</h3>
            <p className="text-base text-slate-500">
              Remove all HeyForm branding and have your forms seamlessly represent your brand.
            </p>
          </li>
          <li className="mb-4">
            <IconBrush className="mr-2 mb-2 inline h-8 w-8 text-slate-500" />
            <h3 className="text-lg font-medium">Theme customization</h3>
            <p className="text-base text-slate-500">
              Style your forms by customizing backgrounds, patterns, fonts, buttons, etc. to suit
              your business needs.
            </p>
          </li>
          <li className="mb-4">
            <IconFile className="mr-2 mb-2 inline h-8 w-8 text-slate-500" />
            <h3 className="text-lg font-medium">Custom meta tags</h3>
            <p className="text-base text-slate-500">
              Optimize the SEO of your form page by setting custom meta tags, rank high in Google
              search results.
            </p>
          </li>
          <li className="mb-4">
            <IconMail className="mr-2 mb-2 inline h-8 w-8 text-slate-500" />
            <h3 className="text-lg font-medium">Build audience</h3>
            <p className="text-base text-slate-500">
              Build, manage, and target a diverse set of audience for better data collection.
            </p>
          </li>
          <li className="mb-4">
            <IconEyeOff className="mr-2 mb-2 inline h-8 w-8 text-slate-500" />
            <h3 className="text-lg font-medium">Hidden fields</h3>
            <p className="text-base text-slate-500">
              Use data that you already have, track information about your audience, and make your
              forms more personal.
            </p>
          </li>
          <li className="mb-4">
            <IconMessageReply className="mr-2 mb-2 inline h-8 w-8 text-slate-500" />
            <h3 className="text-lg font-medium">Custom auto responses</h3>
            <p className="text-base text-slate-500">
              Automatically send your audience a customized email message when they complete the
              form.{' '}
            </p>
          </li>
          <li className="mb-4">
            <IconServer className="mr-2 mb-2 inline h-8 w-8 text-slate-500" />
            <h3 className="text-lg font-medium">API access</h3>
            <p className="text-base text-slate-500">
              Connect the form data at HeyForm with your online business via the API.
            </p>
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
})
