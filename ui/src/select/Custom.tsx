import { SelectorIcon } from '@heroicons/react/outline'
import { CheckIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import type { FC } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useOnClickOutside } from '../hook'
import Spin from '../spin'
import type { SelectProps } from './Native'

const Custom: FC<SelectProps> = ({
  className,
  value,
  isHasError,
  loading,
  disabled,
  unmountOnExit = true,
  valueRender,
  options = [],
  placeholder,
  optionRender,
  onChange,
  ...restProps
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<IOptionType>()
  const [isOpen, setIsOpen] = useState(false)

  function handleButtonClick() {
    setIsOpen(!isOpen)
  }

  function handleExited() {
    setIsOpen(false)
  }

  function handleOptionClick(option: IOptionType) {
    handleButtonClick()
    onChange && onChange(option.value)
  }

  // Hide the list when the user clicks outside it
  useOnClickOutside(ref, () => setIsOpen(false))

  useEffect(() => {
    const option = options.find(row => row.value === value)
    setSelected(option)
  }, [value])

  const handleExitedCallback = useCallback(handleExited, [])

  return (
    <div
      ref={ref}
      className={clsx('select-wrapper', className, {
        'select-error': isHasError
      })}
    >
      <button
        type="button"
        className="select-button"
        disabled={loading || disabled}
        onClick={handleButtonClick}
        {...restProps}
      >
        <span className="select-value" placeholder={placeholder}>
          {valueRender ? valueRender(selected) : selected?.label}
        </span>
        <span className="select-arrow-icon">{loading ? <Spin /> : <SelectorIcon />}</span>
      </button>

      <CSSTransition
        in={isOpen}
        timeout={0}
        classNames="select-popup"
        unmountOnExit={unmountOnExit}
        onExited={handleExitedCallback}
      >
        <ul className="select-popup">
          {options.map(option => (
            <li
              key={option.value as unknown as string}
              className={clsx('select-option', {
                'select-option-active': option.value === value
              })}
              onClick={() => handleOptionClick(option)}
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
      </CSSTransition>
    </div>
  )
}

export default Custom
