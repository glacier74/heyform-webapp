import { Button } from '@heyforms/ui'
import type { FC } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import type { PlanModel, WorkspaceModel } from '@/models'
import { BillingCycleEnum } from '@/models/invoice'

interface PlanItemProps {
  workspace?: WorkspaceModel
  plan: PlanModel
  billingCycle: BillingCycleEnum
  onUpgrade?: (plan: PlanModel) => void
  onDowngrade?: (plan: PlanModel) => void
}

export const PlanItem: FC<PlanItemProps> = ({
  workspace,
  plan,
  billingCycle,
  onUpgrade,
  onDowngrade
}) => {
  const { t } = useTranslation()

  function handleUpgrade() {
    onUpgrade?.(plan)
  }

  function handleDowngrade() {
    onDowngrade?.(plan)
  }

  return useMemo(() => {
    const grade = workspace?.plan.grade

    if (plan.grade > grade!) {
      return (
        <div>
          <button
            className="w-full rounded-md bg-blue-700 py-3 px-6 text-white"
            type="primary"
            onClick={handleUpgrade}
          >
            {t('billing.upgrade')}
          </button>
        </div>
      )
    } else if (plan.grade < grade!) {
      return (
        <div>
          <button
            className="w-full rounded-md bg-slate-700 py-3 px-6 text-white"
            type="primary"
            onClick={handleDowngrade}
          >
            {t('billing.Downgrade')}
          </button>
        </div>
      )
    } else {
      return (
        <div className="rounded-md border border-gray-100 bg-white px-4 py-2 text-center font-medium text-slate-400 sm:text-sm">
          {t('billing.current')}
        </div>
      )
    }
  }, [workspace?.plan.grade, billingCycle])
}
