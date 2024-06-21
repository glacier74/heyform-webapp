import { CHOICE_FIELD_KINDS, RATING_FIELD_KINDS } from '@heyform-inc/shared-types-enums'
import { helper, toFixed } from '@heyform-inc/utils'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import FormReportSubmissions from './Submissions'

interface FormReportItemProps {
  index: number
  response: Any
}

interface ChoicesProps {
  chooses: Any[]
}

interface RatingsProps extends ChoicesProps {
  length: number
}

const Choices: FC<ChoicesProps> = ({ chooses }) => {
  const { t } = useTranslation()
  const total = useMemo(() => chooses.reduce((prev, next) => prev + next.count, 0) || 1, [chooses])

  return (
    <div className="space-y-2">
      {chooses.map((row, index) => {
        const percent = `${toFixed((row.count * 100) / total)}%`

        return (
          <div key={index} className="relative rounded-md bg-primary/[2.5%] px-3 py-2 text-sm/6">
            <div
              className="pointer-events-none absolute bottom-0 left-0 top-0 rounded-md bg-emerald-500/10"
              style={{
                width: percent
              }}
            />
            <div className="relative flex items-center justify-between">
              <span className="font-medium">
                {row.label} · {percent}
              </span>
              <span className=" text-xs/6 text-secondary">
                {t('form.analytics.report.submission', { count: row.count })}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const Ratings: FC<RatingsProps> = ({ length, chooses }) => {
  const { t } = useTranslation()
  const arrays = Array.from<number>({ length }).map((_, index) => index + 1)
  const total = chooses.filter(c => helper.isNumeric(c)).reduce((prev, next) => prev + next, 0)

  return (
    <div className="space-y-2">
      {arrays.map((row, index) => {
        const count = chooses[row] || 0
        const percent = `${toFixed((count * 100) / total)}%`

        return (
          <div key={index} className="relative rounded-md bg-primary/[2.5%] px-3 py-2 text-sm/6">
            <div
              className="pointer-events-none absolute bottom-0 left-0 top-0 rounded-md bg-emerald-500/10"
              style={{
                width: percent
              }}
            />
            <div className="relative flex items-center justify-between">
              <span className="font-medium">
                {row} · {total > 0 ? Math.round((count * 100) / total) : 0}%
              </span>
              <span className="text-xs/6 text-secondary">
                {t('form.analytics.report.submission', { count })}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const FormReportItem: FC<FormReportItemProps> = ({ index, response }) => {
  const { t } = useTranslation()

  const isChoices = useMemo(() => CHOICE_FIELD_KINDS.includes(response.kind), [response.kind])
  const isRating = useMemo(() => RATING_FIELD_KINDS.includes(response.kind), [response.kind])

  const children = useMemo(() => {
    if (isChoices) {
      return <Choices chooses={response.chooses} />
    } else if (isRating) {
      return <Ratings length={response.properties?.total} chooses={response.chooses} />
    } else {
      return <FormReportSubmissions response={response} />
    }
  }, [isChoices, isRating, response])

  return (
    <li>
      <div className="text-sm/6 font-medium">
        {index}. {response.title}
      </div>
      <div className="text-xs/6 text-secondary">
        {isRating
          ? t('form.analytics.report.submission2', {
              count: response.count,
              average: response.average
            })
          : t('form.analytics.report.submission', { count: response.count })}
      </div>

      <div className="mt-2">{children}</div>
    </li>
  )
}

const Skeleton = () => {
  return (
    <div>
      <div className="py-[0.3125rem]">
        <div className="skeleton h-3.5 w-72 rounded-sm"></div>
      </div>
      <div className="py-[0.3125rem]">
        <div className="skeleton h-3.5 w-24 rounded-sm"></div>
      </div>
    </div>
  )
}

export default Object.assign(FormReportItem, {
  Skeleton
})
