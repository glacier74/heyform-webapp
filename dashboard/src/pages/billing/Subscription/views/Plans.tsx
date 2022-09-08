import { BillingCycleEnum, PlanModel } from '@/models'
import { BillingCycleSwitch } from '@/pages/billing/Subscription/views/BillingCycleSwitch'
import { DowngradePlan } from '@/pages/billing/Subscription/views/DowngradePlan'
import { Payment } from '@/pages/billing/Subscription/views/Payment'
import { UpgradePlan } from '@/pages/billing/Subscription/views/UpgradePlan'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect, useVisible } from '@/utils'
import {
  DocumentTextIcon,
  EyeOffIcon,
  GlobeAltIcon,
  MailIcon,
  PencilIcon,
  PhotographIcon,
  ReplyIcon,
  ServerIcon,
  UsersIcon
} from '@heroicons/react/outline'
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
    <div className="p-4">
      <div className="flex items-center justify-center mb-8">
        <BillingCycleSwitch
          plan={workspaceStore.plans[1]}
          value={billingCycle}
          onChange={setBillingCycle}
        />
      </div>

      {workspaceStore.plans.length > 0 && (
        <Payment
          plan={workspaceStore.plans[1]}
          billingCycle={billingCycle}
          onUpgrade={handleUpgrade}
          onDowngrade={handleDowngrade}
        />
      )}

      <div className="mt-12">
        <ul className="grid grid-cols-3 gap-4 text-lg mb-12">
          <li className="mb-4">
            <UsersIcon className="inline w-8 h-8 mr-2 text-gray-500 mb-2" />
            <h3 className="text-lg font-medium">Team collaboration</h3>
            <p className="text-base text-gray-500">
              Invite team members to co-create forms and streamline data collection experiences that
              meet organizational needs and goals.
            </p>
          </li>
          <li className="mb-4">
            <GlobeAltIcon className="inline w-8 h-8 mr-2 text-gray-500 mb-2" />
            <h3 className="text-lg font-medium">Connect custom domain</h3>
            <p className="text-base text-gray-500">
              Add your own domains (or subdomains) to your forms and create SEO-friendly pretty
              URLs. We take care of hosting and SSL certificates for you.
            </p>
          </li>
          <li className="mb-4">
            <PencilIcon className="inline w-8 h-8 mr-2 text-gray-500 mb-2" />
            <h3 className="text-lg font-medium">Remove HeyForm branding</h3>
            <p className="text-base text-gray-500">
              Remove all HeyForm branding and have your forms seamlessly represent your brand.
            </p>
          </li>
          <li className="mb-4">
            <PhotographIcon className="inline w-8 h-8 mr-2 text-gray-500 mb-2" />
            <h3 className="text-lg font-medium">Theme customization</h3>
            <p className="text-base text-gray-500">
              Style your forms by customizing backgrounds, patterns, fonts, buttons, etc. to suit
              your business needs.
            </p>
          </li>
          <li className="mb-4">
            <DocumentTextIcon className="inline w-8 h-8 mr-2 text-gray-500 mb-2" />
            <h3 className="text-lg font-medium">Custom meta tags</h3>
            <p className="text-base text-gray-500">
              Optimize the SEO of your form page by setting custom meta tags, rank high in Google
              search results.
            </p>
          </li>
          <li className="mb-4">
            <MailIcon className="inline w-8 h-8 mr-2 text-gray-500 mb-2" />
            <h3 className="text-lg font-medium">Build audience</h3>
            <p className="text-base text-gray-500">
              Build, manage, and target a diverse set of audience for better data collection.
            </p>
          </li>
          <li className="mb-4">
            <EyeOffIcon className="inline w-8 h-8 mr-2 text-gray-500 mb-2" />
            <h3 className="text-lg font-medium">Hidden fields</h3>
            <p className="text-base text-gray-500">
              Use data that you already have, track information about your audience, and make your
              forms more personal.
            </p>
          </li>
          <li className="mb-4">
            <ReplyIcon className="inline w-8 h-8 mr-2 text-gray-500 mb-2" />
            <h3 className="text-lg font-medium">Custom auto responses</h3>
            <p className="text-base text-gray-500">
              Automatically send your audience a customized email message when they complete the
              form.{' '}
            </p>
          </li>
          <li className="mb-4">
            <ServerIcon className="inline w-8 h-8 mr-2 text-gray-500 mb-2" />
            <h3 className="text-lg font-medium">API access</h3>
            <p className="text-base text-gray-500">
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
}
