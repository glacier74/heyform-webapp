import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect } from '@/utils'
import { MinusIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'
import { Payment } from './Payment'
import { Section } from './Section'

export const Plans = () => {
  const workspaceStore = useStore('workspaceStore')
  const { t } = useTranslation()

  useAsyncEffect(async () => {
    const result = await WorkspaceService.plans()
    workspaceStore.setPlans(result)
  })

  return (
    <div>
      <h3 className="plans-heading text-lg leading-6 font-medium text-gray-900">{t('billing.plans.plan')}</h3>

      <table className="w-full h-px table-fixed">
        <caption className="sr-only">{t('billing.plans.comparison')}</caption>
        <thead>
        <tr>
          <th className="w-1/5" scope="col"/>
          <th className="w-1/5" scope="col"/>
          <th className="w-1/5" scope="col"/>
          <th className="w-1/5" scope="col"/>
          <th className="w-1/5" scope="col"/>
        </tr>
        </thead>
        <tbody className="plans-table border-t border-gray-200 divide-y divide-gray-200">
        <Payment/>

        <Section
          title={t('billing.plans.usage')}
          values={[
            [t('billing.plans.questions'), t('billing.plans.unlimited'), t('billing.plans.unlimited'), t('billing.plans.unlimited'), t('billing.plans.unlimited')],
            [t('billing.plans.formsN'), t('billing.plans.unlimited'), t('billing.plans.unlimited'), t('billing.plans.unlimited'), t('billing.plans.unlimited')],
            [t('billing.plans.submissions'), t('billing.plans.unlimited'), t('billing.plans.unlimited'), t('billing.plans.unlimited'), t('billing.plans.unlimited')],
            [
              t('billing.plans.collaborators'),
              <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>,
              5,
              10,
              30
            ],
            [
              t('billing.plans.contacts'),
              <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>,
              100,
              300,
              1000
            ],
            [
              t('billing.plans.additional'),
              <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>,
              t('billing.plans.seat1'),
              t('billing.plans.seat2'),
              t('billing.plans.seat3')
            ],
            [t('billing.plans.reports'), 1, 5, 10, 30],
            [t('billing.plans.storage'), '100MB', '5GB', '20GB', '50GB']
          ]}
        />

        <Section
          title={t('billing.plans.features')}
          values={[
            [
              t('billing.plans.integrations'),
              t('billing.plans.limited'),
              t('billing.plans.integrations1'),
              t('billing.plans.integrations2'),
              t('billing.plans.unlimited')
            ],
            [t('billing.plans.validation'), true, true, true, true],
            [t('billing.plans.anti'), true, true, true, true],
            [t('billing.plans.template'), true, true, true, true],
            [t('billing.plans.embed'), true, true, true, true],
            [t('billing.plans.submissionLimit'), true, true, true, true],
            [t('billing.plans.schedule'), true, true, true, true],
            [t('billing.plans.URL'), true, true, true, true],
            [t('billing.plans.export'), false, true, true, true],
            [t('billing.plans.Password'), false, true, true, true],
            [t('billing.plans.customized'), false, true, true, true],
            [t('billing.plans.Thank'), false, true, true, true],
            [t('billing.plans.team'), false, true, true, true],
            [t('billing.plans.customDomain'), false, false, true, true],
            [t('billing.plans.whitelabel'), false, false, t('billing.plans.partial'), '100%']
          ]}
        />

        <Section title={t('billing.plans.support')} values={[[t('billing.plans.manager'), false, false, true, true]]}/>
        </tbody>
      </table>
    </div>
  )
}
