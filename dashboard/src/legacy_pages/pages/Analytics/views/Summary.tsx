import { SubHeading } from '@/legacy_pages/components'
import { DEFAULT_SUMMARY_DATA, FORM_ANALYTICS_OPTIONS } from '@/legacy_pages/constants'
import { FormAnalyticsSummary } from '@/legacy_pages/models'
import { Map, RangeProps } from '@/legacy_pages/pages/Analytics/views/Map'
import { formatSeconds } from '@/legacy_pages/utils'
import { FormService } from '@/service'
import { useParam } from '@/utils'
import { ComponentProps, Flex, Select } from '@heyui/component'
import { clone } from '@hpnp/utils/clone'
import { isValid } from '@hpnp/utils/helper'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface SummaryItemProps extends ComponentProps {
  count?: string | number
  text?: string
}

const SummaryItem: FC<SummaryItemProps> = ({ count, text, ...restProps }) => {
  return (
    <ItemContainer {...restProps}>
      <ItemWrapper>
        <Text>{text}</Text>
        <Number>{count}</Number>
      </ItemWrapper>
    </ItemContainer>
  )
}

export const Summary: FC = () => {
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

  function handleRangeChange(range: string) {
    setRange(parseInt(range))
  }

  useEffect(() => {
    fetchAnalytic()
  }, [formId, range])

  return (
    <Container>
      <StyledSubHeading
        action={
          <Select
            size="small"
            value={range}
            options={options}
            allowClear={false}
            loading={loading}
            onChange={handleRangeChange}
          />
        }
      >
        {t('analytics.AnalyticsOverview')}
      </StyledSubHeading>
      <StyledFlex>
        <SummaryItem count={summary.totalVisits} text={t('analytics.Views')} />
        <SummaryItem count={summary.submissionCount} text={t('analytics.Submissions')} />
        <SummaryItem count={`${summary.completeRate}%`} text={t('analytics.complete')} />
        <SummaryItem count={summary.averageDuration} text={t('analytics.Average')} />
      </StyledFlex>

      <Map range={mapRange} />
    </Container>
  )
}

const Container = styled.div``

const StyledFlex = styled(Flex)`
  display: flex;
  margin-bottom: 24px;
`

const ItemWrapper = styled.div`
  margin-left: 15px;
  margin-right: 15px;
  padding: 30px 36px;
  background: #fff;
  border-radius: 3px;
`

const ItemContainer = styled.div`
  width: 25%;
  height: 130px;

  &:nth-of-type(1) {
    ${ItemWrapper} {
      margin-left: 0;
    }
  }

  &:nth-last-of-type(1) {
    ${ItemWrapper} {
      margin-right: 0;
    }
  }
`

const Text = styled.div`
  margin-top: 12px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 500;
`

const Number = styled.div`
  font-size: 24px;
  font-weight: 500;
`

const StyledSubHeading = styled(SubHeading)`
  align-items: center;

  .hey-select {
    width: auto;
    padding: 8px 16px;
    height: auto;
    line-height: inherit;
  }
`
