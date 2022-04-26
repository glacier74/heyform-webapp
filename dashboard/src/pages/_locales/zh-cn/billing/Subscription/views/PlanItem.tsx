import type { OrderModel, PlanModel, WorkspaceModel } from '@/models'
import { BillingCycleEnum } from '@/models/invoice'
import { PaymentService } from '@/service'
import { Button, notification } from '@heyforms/ui'
import type { FC } from 'react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface PlanItemProps {
  workspace?: WorkspaceModel
  plan: PlanModel
  billingCycle: BillingCycleEnum
  onUpgrade?: (plan: PlanModel, order: OrderModel) => void
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
  const price = useMemo(
    () => plan.prices.find(row => row.billingCycle === billingCycle)?.price || 0,
    [plan, billingCycle]
  )
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  async function handleUpgrade() {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      const order = await PaymentService.orderPreview({
        teamId: workspace!.id,
        planId: plan.id,
        billingCycle
      })

      onUpgrade?.(plan, order)
    } catch (err: any) {
      notification.error({
        title: err.message
      })
    }

    setLoading(false)
  }

  function handleDowngrade() {
    onDowngrade?.(plan)
  }

  const component = useMemo(() => {
    const grade = workspace?.plan.grade

    if (plan.grade > grade!) {
      return (
        <>
          <Button className="w-full" type="primary" loading={loading} onClick={handleUpgrade}>
            {t('billing.upgrade')}
          </Button>
          <div className="mt-2 text-gray-400 text-xs text-center">
            {t(BILLING_CYCLE_MAPS[billingCycle])}
          </div>
        </>
      )
    } else if (plan.grade < grade!) {
      return (
        <>
          <Button className="w-full" type="primary" onClick={handleDowngrade}>
            {t('billing.Downgrade')}
          </Button>
          <div className="mt-2 text-gray-400 text-xs text-center">
            {t(BILLING_CYCLE_MAPS[billingCycle])}
          </div>
        </>
      )
    } else {
      return (
        <div className="px-4 py-2 border border-gray-100 sm:text-sm font-medium rounded-md text-gray-400 bg-white text-center">
          {t('billing.current')}
        </div>
      )
    }
  }, [workspace?.plan.grade, billingCycle])

  return (
    <td className="h-full py-8 align-top">
      <div className="relative h-full table">
        <div className="pb-4 text-md font-medium text-gray-900 text-left">{plan.name}</div>
        <p>
          <span className="text-4xl font-bold text-gray-900">¥{price}</span>
          <span className="pl-2 text-base font-medium text-gray-500">{t('billing.perMonth')}</span>
        </p>
        <div className="mt-4 lg:pr-12">{component}</div>
      </div>
    </td>
  )
}
