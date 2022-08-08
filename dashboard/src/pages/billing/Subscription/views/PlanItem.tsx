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

const BILLING_CYCLE_MAPS: any = {
  [BillingCycleEnum.MONTHLY]: 'billing.Monthly',
  [BillingCycleEnum.ANNUALLY]: 'billing.Annually'
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
          <Button className="w-full" type="primary" onClick={handleUpgrade}>
            {t('billing.upgrade')}
          </Button>
          <div className="mt-2 text-gray-400 text-xs text-center">
            {t(BILLING_CYCLE_MAPS[billingCycle])}
          </div>
        </div>
      )
    } else if (plan.grade < grade!) {
      return (
        <div>
          <Button className="w-full" type="primary" onClick={handleDowngrade}>
            {t('billing.Downgrade')}
          </Button>
          <div className="mt-2 text-gray-400 text-xs text-center">
            {t(BILLING_CYCLE_MAPS[billingCycle])}
          </div>
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
