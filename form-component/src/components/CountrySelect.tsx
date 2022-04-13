import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import { Popup, stopEvent } from '@heyforms/ui'
import type { SelectProps } from '@heyforms/ui/lib/types/select/Native'
import type { Options as PopperOptions } from '@popperjs/core/lib/types'
import clsx from 'clsx'
import type { CSSProperties, FC, MouseEvent } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { COUNTRIES } from '../consts'
import { FlagIcon } from './FlagIcon'

interface CountryType {
  value: string
  label: string
  callingCode: string
  slug: string
  example: string
}

interface ItemProps extends Omit<IComponentProps, 'onClick'> {
  country: CountryType
  enableCallingCode?: boolean
  isSelected?: boolean
  onClick: (value: string) => void
}

interface CountrySelectProps extends Omit<SelectProps, 'options'> {
  popupClassName?: string
  enableLabel?: boolean
  enableCallingCode?: boolean
}

const Item: FC<ItemProps> = ({ country, enableCallingCode, isSelected, onClick, ...restProps }) => {
  function handleClick() {
    onClick(country.value)
  }

  return (
    <div
      className={clsx('heyform-radio', {
        'heyform-radio-selected': isSelected
      })}
      onClick={handleClick}
      {...restProps}
    >
      <div className="heyform-radio-container">
        <div className="heyform-radio-content">
          <FlagIcon className="mr-2" countryCode={country.value} />
          {enableCallingCode && (
            <span className="heyform-radio-calling-code mr-2">+{country.callingCode}</span>
          )}
          <span className="heyform-radio-label">{country.label}</span>
        </div>
        {isSelected && (
          <div className="heyform-radio-icon">
            <CheckIcon />
          </div>
        )}
      </div>
    </div>
  )
}

export const CountrySelect: FC<CountrySelectProps> = ({
  className,
  popupClassName,
  value,
  enableLabel = true,
  enableCallingCode = false,
  isHasError,
  placeholder,
  onDropdownVisibleChange,
  onChange
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

  const [isOpen, setIsOpen] = useState(false)
  const [triggerStyle, setTriggerStyle] = useState<CSSProperties>()

  const selected = useMemo(() => {
    return COUNTRIES.find(option => option.value === value)
  }, [value])

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    stopEvent(event)
    setIsOpen(true)
  }

  function handleExited() {
    setIsOpen(false)
    setTriggerStyle(undefined)
  }

  function handleChange(newValue: string) {
    handleExited()
    onChange?.(newValue)
  }

  const handleExitedCallback = useCallback(handleExited, [])
  const handleChangeCallback = useCallback(handleChange, [])

  const memoOverlay = useMemo(() => {
    return (
      <div
        className={clsx('heyform-select-popup', popupClassName)}
        style={{ width: triggerStyle?.width }}
      >
        <div className="w-full">
          {COUNTRIES.map(country => (
            <Item
              key={country.value}
              country={country}
              enableCallingCode={enableCallingCode}
              isSelected={country.value === value}
              onClick={handleChangeCallback}
            />
          ))}
        </div>
      </div>
    )
  }, [value, triggerStyle?.width])

  useEffect(() => {
    if (isOpen) {
      setTriggerStyle(ref?.getBoundingClientRect())
    }

    onDropdownVisibleChange?.(isOpen)
  }, [isOpen])

  return (
    <>
      <div
        ref={setRef}
        className={clsx(
          'heyform-select',
          {
            'heyform-select-open': isOpen,
            'select-error': isHasError
          },
          className
        )}
        onClick={handleClick}
      >
        <div className="heyform-select-container">
          <div className="heyform-select-value">
            {selected && <FlagIcon className="mr-2" countryCode={selected.value} />}
            {enableLabel && (
              <span className="heyform-select-label" placeholder={placeholder}>
                {selected?.label}
              </span>
            )}
          </div>
          <div className="heyform-select-arrow-icon">
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </div>
        </div>
        <div className="heyform-group-highlight" />
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
