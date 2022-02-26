import { SelectorIcon, XIcon } from '@heroicons/react/outline'
import { isValid, isValidArray } from '@hpnp/utils/helper'
import clsx from 'clsx'
import type { CSSProperties, FC, MouseEvent, ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { InputValue } from '../input/Input'
import Search from '../input/Search'
import Popup from '../popup'
import Spin from '../spin'
import { stopEvent } from '../utils'
import { CustomSelectOption } from './Custom'
import type { SelectProps } from './Native'

export interface MultipleSelectProps
  extends Omit<SelectProps, 'value' | 'optionRender' | 'valueRender' | 'onChange'> {
  options: IOptionType[]
  value?: IKeyType[]
  placeholder?: string
  searchPlaceholder?: string
  disabled?: boolean
  createOptionLeading?: ReactNode
  createRequest: (label: string) => Promise<string>
  onChange?: (value: IKeyType[]) => void
}

interface MultipleItemProps extends Pick<MultipleSelectProps, 'labelKey'> {
  option: IOptionType
  onRemove: (option: IOptionType) => void
}

const MultipleItem: FC<MultipleItemProps> = ({ option, labelKey = 'label', onRemove }) => {
  function handleClick() {
    onRemove(option)
  }

  return (
    <span className="multiple-item">
      <span className="multiple-item-label">{option[labelKey]}</span>
      <span className="multiple-item-remove" onClick={handleClick}>
        <XIcon />
      </span>
    </span>
  )
}

const Multiple: FC<MultipleSelectProps> = ({
  className,
  options: rawOptions = [],
  labelKey = 'label',
  valueKey = 'value',
  value = [],
  placeholder,
  searchPlaceholder,
  isHasError,
  loading,
  disabled,
  createOptionLeading,
  createRequest,
  onChange,
  ...restProps
}) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const [triggerStyle, setTriggerStyle] = useState<CSSProperties>()

  const [keyword, setKeyword] = useState<string | null>(null)
  const [options, setOptions] = useState<IOptionType[]>(rawOptions)
  const [selected, setSelected] = useState<IOptionType[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isNewOption, setIsNewOption] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    stopEvent(event)
    setIsOpen(true)
  }

  function handleExited() {
    setIsOpen(false)
  }

  function handleKeywordChange(inputValue?: InputValue) {
    setKeyword(inputValue as string)
  }

  function handleOptionClick(option: IOptionType) {
    const currValue = option[valueKey] as IKeyType
    const newValue = value?.includes(currValue)
      ? value?.filter(v => v !== currValue)
      : [...value, currValue]

    onChange?.(newValue)
  }

  function handleRemove(option: IOptionType) {
    const currValue = option[valueKey] as IKeyType
    onChange?.(value?.filter(v => v !== currValue))
  }

  async function handleCreate() {
    setIsCreating(true)
    setError(null)

    try {
      const val = await createRequest(keyword as string)

      setKeyword(null)
      handleOptionClick({ [valueKey]: val } as IOptionType)
    } catch (err: any) {
      setError(err)
    }

    setIsCreating(false)
  }

  const handleExitedCallback = useCallback(handleExited, [])

  const memoOverlay = useMemo(() => {
    return (
      <div className="select-popup-content">
        <Search placeholder={searchPlaceholder} onChange={handleKeywordChange} />
        <ul style={{ width: triggerStyle?.width }}>
          {options.map(option => (
            <CustomSelectOption
              key={option[valueKey] as string}
              option={option}
              isActive={value?.includes(option[valueKey] as IKeyType)}
              onClick={handleOptionClick}
            />
          ))}
        </ul>
        {isNewOption && (
          <div className="multiple-create-option" onClick={handleCreate}>
            <div className="multiple-create-content">
              {createOptionLeading}
              <span className="multiple-create-keyword">{keyword}</span>
            </div>
            {isCreating && <Spin />}
          </div>
        )}
        {error && <div className="form-item-error">{error.message}</div>}
      </div>
    )
  }, [value, options, isCreating, isNewOption, triggerStyle?.width])

  useEffect(() => {
    if (isOpen) {
      setTriggerStyle(ref?.getBoundingClientRect())
    }
  }, [isOpen])

  useEffect(() => {
    if (isValid(keyword)) {
      setOptions(
        rawOptions.filter(row =>
          (row[labelKey] as string).toLowerCase().includes(keyword!.toLowerCase())
        )
      )
      setIsNewOption(!rawOptions.map(row => row[labelKey]).includes(keyword!))
    } else {
      setOptions(rawOptions)
      setIsNewOption(false)
    }
  }, [keyword, rawOptions])

  useEffect(() => {
    // Update selected options when value changes
    if (isValidArray(value)) {
      const newValue: IOptionType[] = []

      // Inorder to keep the order of the selected options
      value!.forEach(row => {
        const option = options.find(o => o[valueKey] === row)

        if (option) {
          newValue.push(option)
        }
      })

      setSelected(newValue)
    }
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
          className="select-button multiple-select-button"
          disabled={loading || disabled}
          {...restProps}
        >
          <div className="multiple-select-value">
            {selected.map(option => (
              <MultipleItem
                key={option[valueKey] as string}
                option={option}
                labelKey={labelKey}
                onRemove={handleRemove}
              />
            ))}
          </div>
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
        onExited={handleExitedCallback}
      >
        {memoOverlay}
      </Popup>
    </>
  )
}

export default Multiple
