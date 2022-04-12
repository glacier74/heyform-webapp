import clsx from 'clsx'
import type { ChangeEvent, FC, LegacyRef, TextareaHTMLAttributes } from 'react'
import { useEffect, useRef, useState } from 'react'

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  isHasError?: boolean
  onChange?: (value: string | number | undefined) => void
  onFocus?: () => void
  onBlur?: () => void
}

const Textarea: FC<TextareaProps> = ({
  className,
  autoFocus,
  isHasError,
  disabled,
  value: rawValue = '',
  onChange,
  onFocus,
  onBlur,
  ...restProps
}) => {
  const lock = useRef(false)
  const ref = useRef<HTMLAreaElement>(null)
  const [value, setValue] = useState(rawValue)
  const [isFocused, setIsFocused] = useState(false)

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const newValue = event.currentTarget.value
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
      onChange?.(newValue)
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
      setValue(rawValue)
    }
  }, [rawValue])

  useEffect(() => {
    if (ref.current && autoFocus) {
      ref.current.focus()
    }
  }, [ref])

  return (
    <div
      className={clsx(
        'textarea',
        {
          'input-focused': isFocused,
          'textarea-disabled': disabled,
          'input-has-error': isHasError
        },
        className
      )}
      onMouseUp={handleMouseUp}
    >
      <textarea
        ref={ref as unknown as LegacyRef<HTMLTextAreaElement>}
        value={value}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...restProps}
      />
    </div>
  )
}

export default Textarea
