import { DATE_FORMAT_MAPS, DATE_FORMAT_NAMES, TIME_FORMAT } from '@/pages/form/Create/consts'
import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { BlockProps } from './Block'
import { Block } from './Block'

interface DateItemProps {
  format: string
}

export const DateItem: FC<DateItemProps> = ({ format }) => {
  const { t } = useTranslation()
  const dateFormat = DATE_FORMAT_NAMES[format]

  return (
    <div className={`builder-date-item builder-date-item-${dateFormat.id}`}>
      <label htmlFor={`builder-date-${dateFormat.id}`} className="builder-date-label">
        {t(dateFormat.label)}
      </label>
      <input
        id={`builder-date-${dateFormat.id}`}
        type="text"
        className="builder-input"
        placeholder={format}
        disabled={true}
      />
    </div>
  )
}

export const Date: FC<BlockProps> = ({ field, ...restProps }) => {
  const { t } = useTranslation()
  const format = field.properties?.format || 'MM/DD/YYYY'
  const [x, y, z, dateDivider] = DATE_FORMAT_MAPS[format]
  const [h, m, timeDivider] = DATE_FORMAT_MAPS[TIME_FORMAT]

  return (
    <Block className="builder-date" field={field} {...restProps}>
      <div className="builder-date-root">
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
      <FakeSubmit text={t('Next')} icon={<ChevronRightIcon />} />
    </Block>
  )
}
