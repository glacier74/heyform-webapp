import { SearchIcon, SelectorIcon, XIcon } from '@heroicons/react/outline'
import { isValid, isValidArray } from '@hpnp/utils/helper'
import type { Options as PopperOptions } from '@popperjs/core/lib/types'
import clsx from 'clsx'
import type { CSSProperties, FC, MouseEvent, ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { InputValue } from '../input/Input'
import Input from '../input/Input'
import Popup from '../popup'
import Spin from '../spin'
import { stopEvent, stopPropagation } from '../utils'
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
  createRequest?: (label: string) => Promise<string>
  onChange?: (value: IKeyType[]) => void
}

interface MultipleItemProps extends Pick<MultipleSelectProps, 'labelKey'> {
  option: IOptionType
  onRemove: (option: IOptionType) => void
}

const MultipleItem: FC<MultipleItemProps> = ({ option, labelKey = 'label', onRemove }) => {
  function handleClick(event: MouseEvent<HTMLSpanElement>) {
    stopPropagation(event)
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

  const [keyword, setKeyword] = useState<string | null>(null)
  const [options, setOptions] = useState<IOptionType[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isNewOption, setIsNewOption] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const selected = useMemo(
    () => value.map(row => rawOptions.find(o => o[valueKey] === row)).filter(Boolean),
    [value, rawOptions]
  )

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
    if (!createRequest) {
      return
    }

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
      <div className="select-popup-content" onClick={stopPropagation}>
        <Input
          className="multiple-search"
          leading={<SearchIcon />}
          placeholder={searchPlaceholder}
          onChange={handleKeywordChange}
        />
        <ul style={{ width: triggerStyle?.width }}>
          {options.map(option => {
            const key = option[valueKey] as IKeyType

            return (
              <CustomSelectOption
                key={key}
                option={option}
                labelKey={labelKey}
                isActive={value?.includes(key)}
                onClick={handleOptionClick}
              />
            )
          })}
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

      if (createRequest) {
        setIsNewOption(!rawOptions.map(row => row[labelKey]).includes(keyword!))
      }
    } else {
      setOptions(rawOptions)
      setIsNewOption(false)
    }
  }, [keyword, rawOptions])

  // useEffect(() => {
  //   console.log('value change', value)
  //   // Update selected options when value changes
  //   const newValue: IOptionType[] = []
  //
  //   if (isValidArray(value)) {
  //     // Inorder to keep the order of the selected options
  //     value!.forEach(row => {
  //       const option = options.find(o => o[valueKey] === row)
  //
  //       if (option) {
  //         newValue.push(option)
  //       }
  //     })
  //   }
  //
  //   setSelected(newValue)
  // }, [value])

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
          className={clsx('select-button multiple-select-button', {
            'multiple-selected': isValidArray(value)
          })}
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
        popperOptions={popperOptions}
        onExited={handleExitedCallback}
      >
        {memoOverlay}
      </Popup>
    </>
  )
}

export default Multiple
