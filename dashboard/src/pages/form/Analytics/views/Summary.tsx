import { Select } from '@heyforms/ui'
import { clone } from '@hpnp/utils/clone'
import { isValid } from '@hpnp/utils/helper'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SubHeading } from '@/components'
import { FormAnalyticsSummary } from '@/models'
import { FormService } from '@/service'
import { useParam } from '@/utils'

import { Map, RangeProps } from './Map'

interface SummaryItemProps extends IComponentProps {
  count?: string | number
  text?: string
}

const FORM_ANALYTICS_OPTIONS = [
  {
    value: 7,
    label: 'analytics.time.0'
  },
  {
    value: 30,
    label: 'analytics.time.1'
  },
  {
    value: 90,
    label: 'analytics.time.2'
  },
  {
    value: 365,
    label: 'analytics.time.3'
  }
]

const DEFAULT_SUMMARY_DATA = {
  totalVisits: 0,
  submissionCount: 0,
  completeRate: 0,
  averageDuration: '-'
}

function formatSeconds(t: number): string {
  if (t < 60) {
    return `${t}s`
  }

  const m = Math.floor(t / 60)
  const s = t % 60

  return `${m}m ${s}s`
}

const SummaryItem: FC<SummaryItemProps> = ({ count, text, ...restProps }) => {
  return (
    <div className="analytics-item-container h-32 w-1/4" {...restProps}>
      <div className="analytics-item-wrapper rounded-[3px] bg-white px-9 py-8">
        <div className="mt-3 mb-5 text-base font-medium">{text}</div>
        <div className="text-xl font-medium">{count}</div>
      </div>
    </div>
  )
}

const Summary: FC = () => {
  const { t } = useTranslation()
  const { formId } = useParam()
  const [loading, setLoading] = useState(false)
  const [range, setRange] = useState(7)
  const [summary, setSummary] = useState<FormAnalyticsSummary>(DEFAULT_SUMMARY_DATA)
  const [mapRange, setMapRange] = useState<RangeProps>({})

  const options = FORM_ANALYTICS_OPTIONS.map(row => ({
    ...row,
    label: t(row.label)
  }))

  async function fetchAnalytic() {
    if (loading) {
      return
    }

    setLoading(true)

    const result = await FormService.analytic(formId, range)
    const summary = result

    if (isValid(summary)) {
      setSummary(formatSummaryData(summary))
      setMapRange({
        start: summary.at(0).createdAt,
        end: summary.at(-1).updatedAt
      })
    }

    setLoading(false)
  }

  function formatSummaryData(summary: any[]) {
    const data = clone(DEFAULT_SUMMARY_DATA)

    if (isValid(summary)) {
      let totalDuration = 0

      summary!.forEach((row: any) => {
        data.totalVisits += row.totalVisits
        data.submissionCount += row.submissionCount

        if (row.submissionCount > 0) {
          totalDuration += row.submissionCount * row.averageTime
        }
      })

      data.completeRate = Math.ceil((data.submissionCount * 100) / data.totalVisits)

      if (data.submissionCount > 0) {
        const duration = Math.ceil(totalDuration / data.submissionCount)
        data.averageDuration = formatSeconds(duration)
      }
    }

    return data
  }

  function handleRangeChange(range: any) {
    setRange(parseInt(range))
  }

  useEffect(() => {
    fetchAnalytic()
  }, [formId, range])

  return (
    <div>
      <SubHeading
        className="mb-5 flex items-center justify-between"
        action={
          <Select
            className="w-auto"
            popupClassName="!w-[200px]"
            value={range}
            options={options as any}
            loading={loading}
            onChange={handleRangeChange}
          />
        }
      >
        {t('analytics.AnalyticsOverview')}
      </SubHeading>
      <div className="mb-6 flex gap-5">
        <SummaryItem count={summary.totalVisits} text={t('analytics.Views')} />
        <SummaryItem count={summary.submissionCount} text={t('analytics.Submissions')} />
        <SummaryItem count={`${summary.completeRate}%`} text={t('analytics.complete')} />
        <SummaryItem count={summary.averageDuration} text={t('analytics.Average')} />
      </div>

      <Map range={mapRange} />
    </div>
  )
}

export default Summary
