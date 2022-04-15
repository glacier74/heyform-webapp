import { Input, Select } from '@heyforms/ui'
import { isEmpty } from '@hpnp/utils/helper'
import clsx from 'clsx'
import type { FC } from 'react'
import { useState } from 'react'
import './style.scss'

interface NumberRangeValue {
  min?: number
  max?: number
}

enum NumberRangeType {
  UNLIMITED,
  EXACT_NUMBER,
  RANGE
}

export interface NumberRangeProps extends Omit<IComponentProps, 'onChange'> {
  min: number
  max: number
  value?: NumberRangeValue
  onChange?: (value: NumberRangeValue) => void
}

const RANGE_OPTIONS = [
  {
    value: NumberRangeType.UNLIMITED,
    label: 'Unlimited'
  },
  {
    value: NumberRangeType.EXACT_NUMBER,
    label: 'Exact number'
  },
  {
    value: NumberRangeType.RANGE,
    label: 'Range'
  }
]

function getSelectValue(value?: NumberRangeValue) {
  if (isEmpty(value) || (isEmpty(value!.min) && isEmpty(value!.max)) || value!.max === 0) {
    return NumberRangeType.UNLIMITED
  }

  if (value!.min && value!.min > 0 && value!.min === value!.max) {
    return NumberRangeType.EXACT_NUMBER
  }

  return NumberRangeType.RANGE
}

export const NumberRange: FC<NumberRangeProps> = ({
  className,
  value,
  min,
  max,
  onChange,
  ...restProps
}) => {
  const [selectValue, setSelectValue] = useState(getSelectValue(value))
  const [minValue, setMinValue] = useState(value?.min ?? min)

  function handleSelectChange(newSelectValue: any) {
    if (newSelectValue === NumberRangeType.UNLIMITED) {
      onChange?.({
        min: undefined,
        max: undefined
      })
    }

    setSelectValue(newSelectValue)
  }

  function handleExactNumberChange(newValue: any) {
    onChange?.({
      min: newValue,
      max: newValue
    })
  }

  function handleMinChange(newValue: any) {
    setMinValue(newValue)
    onChange?.({
      min: newValue,
      max: value?.max
    })
  }

  function handleMaxChange(newValue: any) {
    onChange?.({
      min: value?.min,
      max: newValue
    })
  }

  return (
    <div
      className={clsx(
        'number-range',
        { 'number-range-unlimited': selectValue === NumberRangeType.UNLIMITED },
        className
      )}
      {...restProps}
    >
      <Select
        popupClassName="number-range-popup"
        options={RANGE_OPTIONS}
        value={selectValue}
        onChange={handleSelectChange}
      />

      {(() => {
        switch (selectValue) {
          case NumberRangeType.EXACT_NUMBER:
            return (
              <Input
                className="w-full ml-1"
                type="number"
                min={min}
                max={max}
                value={value?.max}
                placeholder={`${min} - ${max}`}
                onChange={handleExactNumberChange}
              />
            )

          case NumberRangeType.RANGE:
            return (
              <>
                <Input
                  className="ml-1 flex-1"
                  type="number"
                  min={min}
                  max={max}
                  value={value?.min}
                  placeholder={`${min} - ${max}`}
                  onChange={handleMinChange}
                />
                <Input
                  className="ml-1 flex-1"
                  type="number"
                  min={minValue}
                  max={max}
                  value={value?.max}
                  placeholder={`${minValue} - ${max}`}
                  onChange={handleMaxChange}
                />
              </>
            )
        }
      })()}
    </div>
  )
}