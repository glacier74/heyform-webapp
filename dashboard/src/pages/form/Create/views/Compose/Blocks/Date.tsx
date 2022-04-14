import { DATE_FORMAT_MAPS, DATE_FORMAT_NAMES } from '@/pages/form/Create/consts'
import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

interface DateItemProps {
  format: string
}

const DateItem: FC<DateItemProps> = ({ format }) => {
  const formatName = DATE_FORMAT_NAMES[format]
  const lowerFormatName = formatName.toLowerCase()

  return (
    <div className={`builder-date-item builder-date-item-${lowerFormatName}`}>
      <label htmlFor={`builder-date-${lowerFormatName}`} className="builder-date-label">
        {formatName}
      </label>
      <input
        id={`builder-date-${lowerFormatName}`}
        type="text"
        className="builder-input"
        placeholder={format}
        disabled={true}
      />
    </div>
  )
}

export const Date: FC<BlockProps> = ({ field, ...restProps }) => {
  const format = field.properties?.format || 'MM/DD/YYYY'
  const [x, y, z, divider] = DATE_FORMAT_MAPS[format]

  return (
    <Block className="builder-date" field={field} {...restProps}>
      <div className="builder-date-root">
        <DateItem format={x} />
        <div className="builder-date-divider">{divider}</div>
        <DateItem format={y} />
        <div className="builder-date-divider">{divider}</div>
        <DateItem format={z} />
      </div>
      <FakeSubmit text="Next" icon={<ChevronRightIcon />} />
    </Block>
  )
}
