import { isNan, isString, isValid } from '@hpnp/utils/helper'
import clsx from 'clsx'
import type { ChangeEvent, FC, InputHTMLAttributes, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

export type InputValue = string | number | File

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  autoFocus?: boolean
  isHasError?: boolean
  leading?: ReactNode
  trailing?: ReactNode
  onChange?: (value?: InputValue) => void
  onFocus?: () => void
  onBlur?: () => void
}

const Input: FC<InputProps> = ({
  className,
  type = 'text',
  min,
  max,
  autoFocus,
  isHasError,
  disabled,
  leading,
  trailing,
  value: rawValue = '',
  onChange,
  onFocus,
  onBlur,
  ...restProps
}) => {
  const lock = useRef(false)
  const ref = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState<InputValue>(rawValue as InputValue)
  const [isFocused, setIsFocused] = useState(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    let newValue: InputValue = event.target.value

    if (type === 'file' && isValid(event.target.files)) {
      newValue = event.target.files![0]
    }

    /**
     * If type is number, convert value to number
     * If min or max is not empty, limit the input range
     */
    if (type === 'number') {
      newValue = Number(newValue)

      if (isNan(value)) {
        newValue = rawValue as InputValue
      } else if (max && newValue > max) {
        newValue = max
      } else if (min && newValue < min) {
        newValue = min
      }
    }

    setValue(newValue)

    /**
     * see https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event
     */
    if (event.type === 'compositionstart') {
      lock.current = true
      return
    }

    if (event.type === 'compositionend') {
      lock.current = false
    }

    if (!lock.current) {
      onChange && onChange(newValue)
    }
  }

  function handleMouseUp() {
    ref.current?.focus()
  }

  function handleFocus() {
    setIsFocused(true)
    onFocus && onFocus()
  }

  function handleBlur() {
    setIsFocused(false)
    onBlur && onBlur()
  }

  useEffect(() => {
    if (rawValue !== value) {
      lock.current = false
      setValue(rawValue as InputValue)
    }
  }, [rawValue])

  useEffect(() => {
    if (ref.current && autoFocus) {
      ref.current.focus()
    }
  }, [ref])

  return (
    <div
      className={clsx('input', className, {
        'input-focused': isFocused,
        'input-disabled': disabled,
        'input-has-error': isHasError
      })}
      onMouseUp={handleMouseUp}
    >
      {leading && (
        <span
          className={clsx('input-leading', {
            'pointer-events-none': isString(leading)
          })}
        >
          {leading}
        </span>
      )}
      <input
        ref={ref}
        type={type}
        value={value as string}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...restProps}
      />
      {trailing && (
        <span
          className={clsx('input-trailing', {
            'pointer-events-none': isString(leading)
          })}
        >
          {trailing}
        </span>
      )}
    </div>
  )
}

export default Input
