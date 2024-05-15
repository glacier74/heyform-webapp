import { Button } from '@heyforms/ui'
import { IconCheck } from '@tabler/icons-react'
import type { FC } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { PlanGradeEnum, PlanModel, WorkspaceModel } from '@/models'
import { BillingCycleEnum } from '@/models/invoice'

interface PlanItemProps {
  workspace?: WorkspaceModel
  plan: PlanModel
  billingCycle: BillingCycleEnum
  onUpgrade?: (plan: PlanModel) => void
  onDowngrade?: (plan: PlanModel) => void
}

const PLAN_FEATURES: any = {
  [PlanGradeEnum.BASIC]: [
    'billing.basicPlan.unlimitedForms',
    'billing.basicPlan.responsesPerMonth',
    'billing.basicPlan.workspaceStorage',
    'billing.basicPlan.formReport',
    'billing.basicPlan.customMetaData',
    'billing.basicPlan.hiddenFields',
    'billing.basicPlan.themeCustomization',
    'billing.basicPlan.redirectOnCompletion',
    'billing.basicPlan.downloadData'
  ],
  [PlanGradeEnum.PREMIUM]: [
    'billing.premiumPlan.everythingInBasic',
    'billing.premiumPlan.responsesPerMonth',
    'billing.premiumPlan.workspaceStorage',
    'billing.premiumPlan.inviteUpTo3Members',
    'billing.premiumPlan.customDomain',
    'billing.premiumPlan.customCss',
    'billing.premiumPlan.removeHeyFormBranding',
    'billing.premiumPlan.prioritySupport'
  ],
  [PlanGradeEnum.BUSINESS]: [
    'billing.businessPlan.everythingInPremium',
    'billing.businessPlan.responsesPerMonth',
    'billing.businessPlan.workspaceStorage',
    'billing.businessPlan.inviteUpTo10Members',
    'billing.businessPlan.noCommissionOnPayments',
    'billing.businessPlan.noSizeLimitOnFileUpload'
  ]
}

export const PlanItem: FC<PlanItemProps> = ({
  workspace,
  plan,
  billingCycle,
  onUpgrade,
  onDowngrade
}) => {
  const { t } = useTranslation()
  console.log(JSON.stringify(plan.prices))

  const price = useMemo(
    () => plan.prices.find(price => price.billingCycle === billingCycle)?.price,
    [plan.prices, billingCycle]
  )

  function handleUpgrade() {
    onUpgrade?.(plan)
  }

  function handleDowngrade() {
    onDowngrade?.(plan)
  }

  const children = useMemo(() => {
    const grade = workspace?.plan.grade

    if (plan.grade > grade!) {
      return (
        <div>
          <Button
            className="w-full rounded-md bg-blue-700 py-3 px-6 text-white"
            type="primary"
            onClick={handleUpgrade}
          >
            {t('billing.upgrade')}
          </Button>
        </div>
      )
    } else if (plan.grade < grade!) {
      return (
        <div>
          <Button
            className="w-full rounded-md bg-slate-700 py-3 px-6 text-white"
            type="primary"
            onClick={handleDowngrade}
          >
            {t('billing.Downgrade')}
          </Button>
        </div>
      )
    } else {
      return (
        <div className="rounded-md border border-gray-100 bg-white px-4 py-2 text-center font-medium text-slate-400 sm:text-sm">
          {t('billing.current')}
        </div>
      )
    }
  }, [workspace?.plan.grade, plan.grade, handleUpgrade, handleDowngrade])

  return (
    <div className="justify-self-stretch rounded-2xl border border-slate-100 px-6 py-5 lg:min-w-[300px]">
      <div className="flex h-full flex-col">
        <div className="text-base font-bold uppercase text-slate-900/90">{plan.name}</div>
        <div className="mt-2 mb-4 border-b border-slate-100 pb-4 text-3xl font-bold">
          ${price}/<span className="text-2xl">{t('billing.month')}</span>
        </div>
        <div className="mt-4 mb-6 flex-1 space-y-1.5">
          {PLAN_FEATURES[plan.grade].map((feature: string) => (
            <div key={feature} className="flex items-center gap-2 text-sm text-slate-600">
              <IconCheck className="h-4 w-4 text-blue-600" />
              <span>{t(feature)}</span>
            </div>
          ))}
        </div>
        {children}
      </div>
    </div>
  )
}
