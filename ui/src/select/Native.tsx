import clsx from 'clsx'
import type { ChangeEvent, FC } from 'react'

export interface SelectProps extends Omit<IComponentProps, 'value' | 'onChange'> {
  options?: IOptionType[]
  labelKey?: keyof IOptionType
  valueKey?: keyof IOptionType
  value?: IValueType
  native?: boolean
  isHasError?: boolean
  loading?: boolean
  disabled?: boolean
  unmountOnExit?: boolean
  valueRender?: (option?: IOptionType) => JSX.Element
  placeholder?: string
  optionRender?: (option: IOptionType) => JSX.Element
  onChange?: (value: IValueType) => void
}

const Native: FC<SelectProps> = ({
  className,
  options = [],
  labelKey = 'label',
  valueKey = 'value',
  value,
  isHasError,
  placeholder,
  onChange,
  ...restProps
}) => {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange?.(event.target.value)
  }

  return (
    <select
      value={value as unknown as string}
      className={clsx('select', className, {
        'select-error': isHasError
      })}
      placeholder={placeholder}
      onChange={handleChange}
      {...restProps}
    >
      {options.map(option => (
        <option key={option[valueKey] as string} value={option[valueKey] as string}>
          {option[labelKey]}
        </option>
      ))}
    </select>
  )
}

export default Native
