import { isValid } from '@hpnp/utils/helper'
import dayjs from 'dayjs'
import type { ChangeEvent, FC } from 'react'
import { startTransition, useState } from 'react'
import {
  DATE_FORMAT_MAPS,
  DATE_FORMAT_NAMES,
  DATE_FORMAT_RANGE,
  FILTER_NUMBER_REGEX
} from '../consts'

type FormatType = 'YYYY' | 'MM' | 'DD'

interface ItemProps extends Omit<IComponentProps, 'onChange'> {
  format: FormatType
  value?: string | number
  onChange: (format: FormatType, value?: number) => void
}

interface DateInputProps extends Omit<IComponentProps, 'onChange'> {
  format?: string
  value?: string
  onChange?: (value: string) => void
}

const Item: FC<ItemProps> = ({ format, value: rawValue = '', onChange }) => {
  const formatName = DATE_FORMAT_NAMES[format]
  const maxLength = formatName.length
  const [minValue, maxValue] = DATE_FORMAT_RANGE[format]

  const [value, setValue] = useState<string>(String(rawValue)?.replace(FILTER_NUMBER_REGEX, ''))

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    let newValue = event.target.value.replace(FILTER_NUMBER_REGEX, '')
    let numberValue: number | undefined

    if (isValid(newValue)) {
      if (newValue.length > maxLength) {
        newValue = newValue.slice(0, maxLength)
      }

      numberValue = Number(newValue)

      if (numberValue < minValue) {
        numberValue = minValue
      } else if (numberValue > maxValue) {
        numberValue = maxValue
      }
    }

    setValue(numberValue ? String(numberValue) : '')
    startTransition(() => {
      onChange?.(format, numberValue)
    })
  }

  return (
    <div className={`heyform-date-input heyform-date-item-${formatName}`}>
      <label htmlFor={`heyform-date-${formatName}`} className="heyform-date-label">
        {formatName}
      </label>
      <input
        id={`heyform-date-${formatName}`}
        className="heyform-input"
        type="text"
        value={value}
        placeholder={format}
        onChange={handleChange}
      />
    </div>
  )
}

function parseDate(value?: string): IMapType<number> {
  if (isValid(value)) {
    const date = dayjs(value)

    if (date.isValid()) {
      return {
        YYYY: date.year(),
        MM: date.month() + 1,
        DD: date.date()
      }
    }
  }

  return {}
}

function formatDate(value: IMapType<number>, format: string): string {
  let result = format

  for (const key of Object.keys(value)) {
    result = result.replace(key, String(value[key] ?? ''))
  }

  return result
}

export const DateInput: FC<DateInputProps> = ({
  format = 'MM/DD/YYYY',
  value: rawValue,
  onChange
}) => {
  const [year, month, day, divider] = DATE_FORMAT_MAPS[format]
  const [value, setValue] = useState<IMapType<number>>(parseDate(rawValue))

  function handleChange(f: FormatType, v?: number) {
    const newValue: any = { ...value, [f]: v }

    setValue(newValue)

    startTransition(() => {
      onChange?.(formatDate(newValue, format))
    })
  }

  return (
    <div className="heyform-date-root">
      <Item format={year} value={value[year]} onChange={handleChange} />
      <div className="heyform-date-divider">{divider}</div>
      <Item format={month} value={value[month]} onChange={handleChange} />
      <div className="heyform-date-divider">{divider}</div>
      <Item format={day} value={value[day]} onChange={handleChange} />
    </div>
  )
}
