import { unixDate } from '@heyform-inc/utils'
import { useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { Button } from '@/components'
import { PlanGradeEnum, STRIPE_PORTAL_URL } from '@/consts'
import { useAppStore, useWorkspaceStore } from '@/store'
import { formatDay } from '@/utils'

export default function WorkspaceBilling() {
  const { t, i18n } = useTranslation()

  const { openModal } = useAppStore()
  const {
    workspace: { plan, subscription }
  } = useWorkspaceStore()

  const isSubscribed = useMemo(() => plan.grade > PlanGradeEnum.FREE, [plan.grade])
  const isNeverExpire = useMemo(
    () => isSubscribed && subscription.endAt <= 0,
    [isSubscribed, subscription.endAt]
  )

  const ExpireDate = useMemo(() => {
    if (subscription.endAt > 0) {
      const endAt = formatDay(unixDate(subscription.endAt), i18n.language)

      if (subscription.canceledAt && subscription.canceledAt > 0) {
        const canceledAt = formatDay(unixDate(subscription.canceledAt), i18n.language)

        return t('billing.subscription.canceled', {
          canceledAt,
          endAt
        })
      }

      return t('billing.subscription.renewsOn', {
        date: endAt
      })
    }

    return t('billing.subscription.neverExpires')
  }, [i18n.language, subscription.canceledAt, subscription.endAt, t])

  function handleViewPlans() {
    openModal('UpgradeModal', {
      isBillingPage: true
    })
  }

  function handleManageSubscription() {
    window.location.href = STRIPE_PORTAL_URL
  }

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-2xl/8 font-semibold sm:text-xl/8">{t('billing.title')}</h1>
      </div>

      <section className="mt-8">
        <h2 className="text-base/6 font-semibold">{t('billing.subscription.headline')}</h2>
        <p className="text-sm/6 text-secondary">
          <Trans
            t={t}
            i18nKey="billing.subscription.subHeadline"
            values={{
              planName: plan.name
            }}
          />{' '}
          {ExpireDate}
        </p>

        {!isNeverExpire && (
          <div className="mt-2.5 flex flex-col gap-4 lg:flex-row lg:items-center">
            <Button className="w-full !px-2 !py-1 lg:w-auto" size="md" onClick={handleViewPlans}>
              {t('billing.plans.view')}
            </Button>

            {isSubscribed && (
              <Button.Ghost
                className="w-full !px-2 !py-1 lg:w-auto"
                size="md"
                onClick={handleManageSubscription}
              >
                {t('billing.subscription.manage')}
              </Button.Ghost>
            )}
          </div>
        )}
      </section>

      {isSubscribed && (
        <section className="mt-8">
          <h2 className="text-base/6 font-semibold">{t('billing.invoices.headline')}</h2>
          <p className="text-sm/6 text-secondary">
            <Trans
              t={t}
              i18nKey="billing.invoices.subHeadline"
              components={{
                button: (
                  <Button.Link
                    className="!bg-transparent !px-0 !py-0 text-secondary underline hover:text-primary"
                    onClick={handleManageSubscription}
                  />
                )
              }}
            />
          </p>
        </section>
      )}
    </>
  )
}
