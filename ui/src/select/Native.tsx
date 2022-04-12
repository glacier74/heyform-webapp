import type { Placement as PopperPlacement } from '@popperjs/core/lib/enums'
import clsx from 'clsx'
import type { ChangeEvent, FC } from 'react'

export interface SelectProps extends Omit<IComponentProps, 'value' | 'onChange'> {
  popupClassName?: string
  placement?: PopperPlacement
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
  optionRender?: (option: IOptionType, isActive?: boolean) => JSX.Element
  onDropdownVisibleChange?: (isVisible: boolean) => void
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
      className={clsx(
        'select',
        {
          'select-error': isHasError
        },
        className
      )}
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
