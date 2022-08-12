import type { PlanModel, WorkspaceModel } from '@/models'
import { BillingCycleEnum } from '@/models/invoice'
import { Button } from '@heyforms/ui'
import type { FC } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

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
          <button className="py-3 px-6 bg-blue-700 rounded-md w-full text-white" type="primary" onClick={handleUpgrade}>
            {t('billing.upgrade')}
          </button>
        </div>
      )
    } else if (plan.grade < grade!) {
      return (
        <div>
          <button className="py-3 px-6 bg-gray-700 rounded-md w-full text-white" type="primary" onClick={handleDowngrade}>
            {t('billing.Downgrade')}
          </button>
        </div>
      )
    } else {
      return (
        <div className="px-4 py-2 border border-gray-100 sm:text-sm font-medium rounded-md text-gray-400 bg-white text-center">
          {t('billing.current')}
        </div>
      )
    }
  }, [workspace?.plan.grade, billingCycle])
}
