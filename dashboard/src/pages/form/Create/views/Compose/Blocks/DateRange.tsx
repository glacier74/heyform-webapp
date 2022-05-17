import { DATE_FORMAT_MAPS, TIME_FORMAT } from '@/pages/form/Create/consts'
import { DateItem } from '@/pages/form/Create/views/Compose/Blocks/Date'
import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const DateRange: FC<BlockProps> = ({ field, ...restProps }) => {
  const { t } = useTranslation()
  const format = field.properties?.format || 'MM/DD/YYYY'
  const [x, y, z, dateDivider] = DATE_FORMAT_MAPS[format]
  const [h, m, timeDivider] = DATE_FORMAT_MAPS[TIME_FORMAT]

  return (
    <Block className="builder-date" field={field} {...restProps}>
      <div
        className={clsx('flex items-center builder-date-range', {
          'builder-date-range-with-time': field.properties?.allowTime
        })}
      >
        <div className="builder-date-root builder-start-date">
          <DateItem format={x} />
          <div className="builder-date-divider">{dateDivider}</div>
          <DateItem format={y} />
          <div className="builder-date-divider">{dateDivider}</div>
          <DateItem format={z} />

          {field.properties?.allowTime && (
            <>
              <DateItem format={h} />
              <div className="builder-date-divider">{timeDivider}</div>
              <DateItem format={m} />
            </>
          )}
        </div>

        <div className="builder-date-range-divider">{t('formBuilder.dateRangeTo')}</div>

        <div className="builder-date-root builder-end-date">
          <DateItem format={x} />
          <div className="builder-date-divider">{dateDivider}</div>
          <DateItem format={y} />
          <div className="builder-date-divider">{dateDivider}</div>
          <DateItem format={z} />

          {field.properties?.allowTime && (
            <>
              <DateItem format={h} />
              <div className="builder-date-divider">{timeDivider}</div>
              <DateItem format={m} />
            </>
          )}
        </div>
      </div>

      <FakeSubmit text={t('Next')} icon={<ChevronRightIcon />} />
    </Block>
  )
}
