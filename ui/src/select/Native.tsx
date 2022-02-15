import clsx from 'clsx'
import type { ChangeEvent, FC } from 'react'

export interface SelectProps extends Omit<IComponentProps, 'value' | 'onChange'> {
  value?: IValueType
  isHasError?: boolean
  loading?: boolean
  disabled?: boolean
  unmountOnExit?: boolean
  valueRender?: (option?: IOptionType) => JSX.Element
  placeholder?: string
  options?: IOptionType[]
  optionRender?: (option: IOptionType) => JSX.Element
  onChange?: (value: IValueType) => void
}

const Native: FC<SelectProps> = ({
  className,
  value,
  isHasError,
  placeholder,
  options = [],
  onChange,
  ...restProps
}) => {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange && onChange(event.target.value)
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
        <option key={option.value as unknown as string} value={option.value as unknown as string}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Native
