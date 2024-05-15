import { Button } from '@heyforms/ui'
import { formatBytes, unixDate } from '@hpnp/utils'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import type { FC, ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Async } from '@/components'
import { PlanGradeEnum } from '@/models'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'

interface ItemProps {
  title: string
  description: ReactNode
}

interface MemberItemProps {
  count?: number
  limit: number | string
  additional?: number
}

const Skeleton = () => {
  return (
    <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="rounded-md border border-gray-200 bg-white px-4 py-5 sm:p-6">
          <dt className="skeleton h-4 w-16" />
          <dd className="skeleton mt-2 h-7 w-32" />
        </div>
      ))}
    </dl>
  )
}

const Item: FC<ItemProps> = ({ title, description }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
      <dt className="truncate text-sm font-medium text-slate-500">{title}</dt>
      <dd className="mt-4 text-2xl font-semibold text-slate-900">{description}</dd>
    </div>
  )
}

const MemberItem: FC<MemberItemProps> = ({ count = 1, limit, additional = 0 }) => {
  const capacity = Math.max((limit as number) + additional, 1)
  const { t } = useTranslation()
  return (
    <Item
      title={t('billing.member')}
      description={
        <>
          <span>
            {count}/{capacity}{' '}
          </span>
          {additional > 0 && <span className="pl-2 text-slate-500">({additional} additional)</span>}
        </>
      }
    />
  )
}

const SubmissionItem: FC<MemberItemProps> = ({ count, limit }) => {
  const { t } = useTranslation()
  return (
    <Item
      title={t('billing.submission')}
      description={
        <>
          <div>
            {count || 0} / {(limit as number) < 0 ? '∞' : limit}
          </div>
          <div className="text-[13px] font-normal text-gray-500">
            {t('billing.resetsOn', {
              date: dayjs().startOf('month').add(1, 'month').format('MMM DD, YYYY')
            })}
          </div>
        </>
      }
    />
  )
}

const StorageItem: FC<MemberItemProps> = ({ count, limit }) => {
  const { t } = useTranslation()
  return (
    <Item
      title={t('billing.storage')}
      description={
        <>
          {formatBytes(count || 0)} / {limit}
        </>
      }
    />
  )
}

export const SubscriptionDetail: FC = observer(() => {
  const { workspaceId } = useParam()
  const workspaceStore = useStore('workspaceStore')
  const appStore = useStore('appStore')

  const { plan, subscription } = workspaceStore.workspace!
  const { t } = useTranslation()

  const [detail, setDetail] = useState<any>({})

  const isSubscribed = useMemo(
    () => plan.grade > PlanGradeEnum.FREE && subscription.endAt > 0,
    [plan.grade, subscription.endAt]
  )

  const isNeverExpires = useMemo(
    () => plan.grade > PlanGradeEnum.FREE && subscription.endAt <= 0,
    [plan.grade, subscription.endAt]
  )

  const description = useMemo(() => {
    if (subscription.endAt > 0) {
      const endAt = unixDate(subscription.endAt).format('MMM DD, YYYY')

      if (subscription.canceledAt) {
        const canceledAt = unixDate(subscription.canceledAt).format('MMM DD, YYYY')

        return t('billing.canceledPlan', { endAt, canceledAt })
      }

      return `${t('billing.planMay')} ${endAt}`
    }

    return t('billing.noExpires')
  }, [plan.grade, subscription.canceledAt, subscription.endAt])

  async function fetchSubscription() {
    const result = await WorkspaceService.subscription(workspaceId)
    setDetail(result)
    return false
  }

  function handleViewPlans() {
    appStore.isPlanModalOpen = true
  }

  function handleManageSubscription() {
    window.location.href = import.meta.env.VITE_STRIPE_PORTAL_URL
  }

  return (
    <div>
      <div className="flex flex-col items-start justify-start md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-medium leading-6 text-slate-900">
            {plan.name} {t('billing.Plan')}
          </h3>
          <p className="mt-1 text-sm font-medium text-slate-500">{description}</p>
        </div>

        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center">
          {!isNeverExpires && (
            <Button
              className="w-full !py-1 !px-2 lg:w-auto"
              type="primary"
              onClick={handleViewPlans}
            >
              {t('billing.viewPlans')}
            </Button>
          )}

          {isSubscribed && (
            <Button className="w-full !py-1 !px-2 lg:w-auto" onClick={handleManageSubscription}>
              {t('billing.manageSubscription')}
            </Button>
          )}
        </div>
      </div>

      <Async request={fetchSubscription} skeleton={<Skeleton />}>
        <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-4">
          <Item title={t('billing.form')} description={detail.formCount} />
          <SubmissionItem count={detail.submissionQuota} limit={plan.submissionLimit} />
          <MemberItem
            count={detail.memberCount}
            limit={plan.memberLimit}
            additional={workspaceStore.workspace.additionalSeats}
          />
          <StorageItem count={detail.storageQuota} limit={plan.storageLimit} />
        </dl>
      </Async>
    </div>
  )
})
