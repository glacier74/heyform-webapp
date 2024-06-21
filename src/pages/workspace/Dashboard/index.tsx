import { useTranslation } from 'react-i18next'

import { useUserStore } from '@/store'
import { getTimePeriod } from '@/utils'

import Overview from './Overview'
import RecentForms from './RecentForms'

export default function WorkspaceDashboard() {
  const { t } = useTranslation()
  const { user } = useUserStore()

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-2xl/8 font-semibold sm:text-xl/8">
          {t(`dashboard.${getTimePeriod()}`, { name: user.name })}
        </h1>
      </div>

      {/* Overview */}
      <section className="mt-8">
        <div className="flex items-end justify-between">
          <h2 className="text-base/6 font-semibold">{t('dashboard.overview')}</h2>
        </div>
        <Overview />
      </section>

      {/* Recent forms */}
      <section className="mt-14">
        <h2 className="text-base/6 font-semibold">{t('dashboard.recentForms')}</h2>
        <RecentForms />
      </section>
    </>
  )
}
