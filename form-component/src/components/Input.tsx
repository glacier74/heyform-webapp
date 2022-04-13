import { isNan, isNil } from '@hpnp/utils/helper'
import type { ChangeEvent, FC } from 'react'
import { useEffect, useRef, useState } from 'react'

interface InputProps {
  type?: 'text' | 'email' | 'number' | 'tel'
  disabled?: boolean
  value?: any
  min?: number
  max?: number
  placeholder?: string
  onChange?: (value?: any) => void
}

export const Input: FC<InputProps> = ({
  type,
  value: rawValue = '',
  disabled,
  onChange,
  ...restProps
}) => {
  const [value, setValue] = useState(rawValue)
  const lockRef = useRef(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    let newValue: any = event.target.value

    /**
     * If type is number, convert value to number
     * If min or max is not empty, limit the input range
     */
    if (type === 'number') {
      newValue = Number(newValue)

      if (isNan(value)) {
        newValue = rawValue
      } else if (restProps.max && newValue > restProps.max) {
        newValue = restProps.max
      } else if (!isNil(restProps.min) && newValue < restProps.min!) {
        newValue = restProps.min!
      }
    }

    setValue(newValue)

    /**
     * see https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event
     */
    if (event.type === 'compositionstart') {
      lockRef.current = true
      return
    }

    if (event.type === 'compositionend') {
      lockRef.current = false
    }

    if (!lockRef.current) {
      onChange?.(newValue)
    }
  }

  useEffect(() => {
    if (rawValue !== value) {
      lockRef.current = false
      setValue(rawValue)
    }
  }, [rawValue])

  return (
    <input
      className="heyform-input"
      type={type}
      value={value as string}
      disabled={disabled}
      onChange={handleChange}
      {...restProps}
    />
  )
}
