import { Async } from '@/components'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'
import { formatBytes, unixDate } from '@hpnp/utils'
import { observer } from 'mobx-react-lite'
import type { FC, ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ItemProps {
  title: string
  description: ReactNode
}

interface MemberItemProps {
  count?: number
  limit: number | string
  additional?: number
}

function formatNumber(num: number): any {
  return num === -1 ? 'Unlimited' : num
}

const Skeleton = () => {
  return (
    <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="px-4 py-5 bg-white rounded-md border border-gray-200 sm:p-6">
          <dt className="skeleton w-16 h-4" />
          <dd className="skeleton mt-2 w-32 h-7" />
        </div>
      ))}
    </dl>
  )
}

const Item: FC<ItemProps> = ({ title, description }) => {
  return (
    <div className="px-4 py-5 bg-white rounded-md border border-gray-200 sm:p-6">
      <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
      <dd className="mt-1 text-2xl font-semibold text-gray-900">{description}</dd>
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
          {additional > 0 && <span className="pl-2 text-gray-500">({additional} additional)</span>}
        </>
      }
    />
  )
}

const AudienceItem: FC<MemberItemProps> = ({ count, limit }) => {
  const { t } = useTranslation()
  return (
    <Item
      title={t('billing.audience')}
      description={
        <>
          {count}/{formatNumber(limit as number)}
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
  const { plan, subscription } = workspaceStore.workspace!
  const [detail, setDetail] = useState<any>({})
  const { t } = useTranslation()

  const description = useMemo(() => {
    if (subscription.endAt && subscription.endAt > 0) {
      return `${t('billing.planMay')} ${unixDate(subscription.endAt).format('MMM DD, YYYY')}`
    }

    return t('billing.noExpires')
  }, [plan.grade, subscription.endAt])

  async function fetchSubscription() {
    const result = await WorkspaceService.subscription(workspaceId)
    setDetail(result)
    return false
  }

  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        {plan.name} {t('billing.Plan')}
      </h3>
      <p className="mt-1 text-sm font-medium text-gray-500">{description}</p>

      <Async request={fetchSubscription} skeleton={<Skeleton />}>
        <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-4">
          <MemberItem
            count={detail.memberCount}
            limit={plan.memberLimit}
            additional={workspaceStore.workspace.additionalSeats}
          />
          <AudienceItem count={detail.contactCount} limit={plan.contactLimit} />
          <Item title={t('billing.form')} description={detail.formCount} />
          <StorageItem count={detail.storageQuota} limit={plan.storageLimit} />
        </dl>
      </Async>
    </div>
  )
})
