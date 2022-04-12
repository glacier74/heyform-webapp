import { DATE_FORMAT_MAPS, DATE_FORMAT_NAMES } from '@/pages/form/Create/consts'
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
    <div className={`heyform-date-item heyform-date-item-${lowerFormatName}`}>
      <label htmlFor={`heyform-date-${lowerFormatName}`} className="heyform-date-label">
        {formatName}
      </label>
      <input
        id={`heyform-date-${lowerFormatName}`}
        type="text"
        className="heyform-input"
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
    <Block className="heyform-date" field={field} {...restProps}>
      <div className="heyform-date-root">
        <DateItem format={x} />
        <div className="heyform-date-divider">{divider}</div>
        <DateItem format={y} />
        <div className="heyform-date-divider">{divider}</div>
        <DateItem format={z} />
      </div>
    </Block>
  )
}
