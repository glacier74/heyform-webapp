import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useAsyncEffect } from '@/utils'
import { MinusIcon } from '@heroicons/react/outline'
import { Payment } from './Payment'
import { Section } from './Section'

export const Plans = () => {
  const workspaceStore = useStore('workspaceStore')

  useAsyncEffect(async () => {
    const result = await WorkspaceService.plans()
    workspaceStore.setPlans(result)
  })

  return (
    <div>
      <h3 className="plans-heading text-lg leading-6 font-medium text-gray-900">Plans</h3>

      <table className="w-full h-px table-fixed">
        <caption className="sr-only">Pricing plan comparison</caption>
        <thead>
          <tr>
            <th className="w-1/5" scope="col" />
            <th className="w-1/5" scope="col" />
            <th className="w-1/5" scope="col" />
            <th className="w-1/5" scope="col" />
            <th className="w-1/5" scope="col" />
          </tr>
        </thead>
        <tbody className="plans-table border-t border-gray-200 divide-y divide-gray-200">
          <Payment />

          <Section
            title="Usage"
            values={[
              ['Number of questions per form', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited'],
              ['Number of forms', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited'],
              ['Number of submissions', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited'],
              [
                'Number of collaborators',
                <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />,
                5,
                10,
                30
              ],
              [
                'Number of contacts',
                <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />,
                100,
                300,
                1000
              ],
              [
                'Additional Seats Cost',
                <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />,
                '$3/seat/month',
                '$5/seat/month',
                '$8/seat/month'
              ],
              ['Reports', 1, 5, 10, 30],
              ['Storage', '100MB', '5GB', '20GB', '50GB']
            ]}
          />

          <Section
            title="Features"
            values={[
              [
                'Integrations',
                'Limited',
                'Limited (70% unlocked)',
                'Limited (85% unlocked)',
                'Unlimited'
              ],
              ['Fields Validation', true, true, true, true],
              ['Anti spam and bots Prevention', true, true, true, true],
              ['Access to Template Gallery', true, true, true, true],
              ['Embed to website', true, true, true, true],
              ['Close on submission limit', true, true, true, true],
              ['Schedule a close date', true, true, true, true],
              ['Custom URL redirects', true, true, true, true],
              ['Export data to CSV', false, true, true, true],
              ['Password Protection', false, true, true, true],
              ['Theme Customization', false, true, true, true],
              ['Custom Thank you page', false, true, true, true],
              ['Team Collaboration', false, true, true, true],
              ['Custom Domain', false, false, true, true],
              ['Whitelabel Branding', false, false, 'Partial', '100%']
            ]}
          />

          <Section title="Support" values={[['Dedicated manager', false, false, true, true]]} />
        </tbody>
      </table>
    </div>
  )
}
