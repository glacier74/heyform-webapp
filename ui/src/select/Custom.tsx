import { SelectorIcon } from '@heroicons/react/outline'
import { CheckIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import type { CSSProperties, FC } from 'react'
import { MouseEvent, useEffect, useMemo, useState } from 'react'
import Popup from '../popup'
import Spin from '../spin'
import { stopEvent } from '../utils'
import type { SelectProps } from './Native'

const Custom: FC<SelectProps> = ({
  className,
  value,
  isHasError,
  loading,
  disabled,
  valueRender,
  options = [],
  placeholder,
  optionRender,
  onChange,
  ...restProps
}) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const [selected, setSelected] = useState<IOptionType>()
  const [isOpen, setIsOpen] = useState(false)
  const [triggerStyle, setTriggerStyle] = useState<CSSProperties>()

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    stopEvent(event)
    setIsOpen(true)
  }

  function handleExited() {
    setIsOpen(false)
  }

  function handleOptionClick(option: IOptionType, event: MouseEvent<HTMLLIElement>) {
    stopEvent(event)
    handleExited()
    onChange?.(option.value)
  }

  useEffect(() => {
    if (isOpen) {
      setTriggerStyle(ref?.getBoundingClientRect())
    }
  }, [isOpen])

  useEffect(() => {
    const option = options.find(row => row.value === value)
    setSelected(option)
  }, [value])

  const memoOverlay = useMemo(() => {
    return (
      <ul className="select-popup-content" style={{ width: triggerStyle?.width }}>
        {options.map(option => (
          <li
            key={option.value as unknown as string}
            className={clsx('select-option', {
              'select-option-active': option.value === value
            })}
            onClick={event => handleOptionClick(option, event)}
          >
            {optionRender ? (
              optionRender(option)
            ) : (
              <>
                <span className="select-option-text">{option.label}</span>
                <span className="select-option-checkmark">
                  <CheckIcon />
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    )
  }, [triggerStyle?.width])

  return (
    <>
      <div
        ref={setRef}
        className={clsx('select-wrapper', className, {
          'select-error': isHasError
        })}
        onClick={handleClick}
      >
        <button
          type="button"
          className="select-button"
          disabled={loading || disabled}
          {...restProps}
        >
          <span className="select-value" placeholder={placeholder}>
            {valueRender ? valueRender(selected) : selected?.label}
          </span>
          <span className="select-arrow-icon">{loading ? <Spin /> : <SelectorIcon />}</span>
        </button>
      </div>

      <Popup
        visible={isOpen}
        referenceRef={ref as Element}
        popperOptions={{
          placement: 'bottom-start',
          strategy: 'fixed',
          modifiers: [
            {
              name: 'computeStyles',
              options: {
                gpuAcceleration: false
              }
            }
          ]
        }}
        onExited={handleExited}
      >
        {memoOverlay}
      </Popup>
    </>
  )
}

export default Custom
