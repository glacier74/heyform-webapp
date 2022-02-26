import { SelectorIcon } from '@heroicons/react/outline'
import { CheckIcon } from '@heroicons/react/solid'
import type { Options as PopperOptions } from '@popperjs/core/lib/types'
import clsx from 'clsx'
import type { CSSProperties, FC, MouseEvent } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Popup from '../popup'
import Spin from '../spin'
import { stopEvent, stopPropagation } from '../utils'
import type { SelectProps } from './Native'

interface CustomOptionProps extends Pick<SelectProps, 'labelKey' | 'optionRender'> {
  option: IOptionType
  isActive?: boolean
  onClick: (option: IOptionType) => void
}

export const CustomSelectOption: FC<CustomOptionProps> = ({
  option,
  labelKey = 'label',
  isActive,
  optionRender,
  onClick
}) => {
  function handleClick() {
    onClick(option)
  }

  return (
    <li
      className={clsx('select-option', {
        'select-option-active': isActive
      })}
      onClick={handleClick}
    >
      {optionRender ? (
        optionRender(option)
      ) : (
        <>
          <span className="select-option-text">{option[labelKey]}</span>
          <span className="select-option-checkmark">
            <CheckIcon />
          </span>
        </>
      )}
    </li>
  )
}

const Custom: FC<SelectProps> = ({
  className,
  options = [],
  labelKey = 'label',
  valueKey = 'value',
  value,
  isHasError,
  loading,
  disabled,
  valueRender,
  placeholder,
  optionRender,
  onChange,
  ...restProps
}) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const popperOptions: Partial<PopperOptions> = useMemo(() => {
    return {
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
    }
  }, [])

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

  function handleOptionClick(option: IOptionType) {
    handleExited()
    onChange?.(option[valueKey])
  }

  const handleExitedCallback = useCallback(handleExited, [])

  const memoOverlay = useMemo(() => {
    return (
      <ul
        className="select-popup-content"
        style={{ width: triggerStyle?.width }}
        onClick={stopPropagation}
      >
        {options.map(option => (
          <CustomSelectOption
            key={option[valueKey] as string}
            option={option}
            isActive={option[valueKey] === value}
            onClick={handleOptionClick}
          />
        ))}
      </ul>
    )
  }, [options, value, triggerStyle?.width])

  useEffect(() => {
    if (isOpen) {
      setTriggerStyle(ref?.getBoundingClientRect())
    }
  }, [isOpen])

  useEffect(() => {
    const option = options.find(row => row[valueKey] === value)
    setSelected(option)
  }, [value])

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
            {valueRender ? valueRender(selected) : selected && selected[labelKey]}
          </span>
          <span className="select-arrow-icon">{loading ? <Spin /> : <SelectorIcon />}</span>
        </button>
      </div>

      <Popup
        visible={isOpen}
        referenceRef={ref as Element}
        popperOptions={popperOptions}
        onExited={handleExitedCallback}
      >
        {memoOverlay}
      </Popup>
    </>
  )
}

export default Custom
