import clsx from 'clsx'
import type { FC } from 'react'
import { useCallback } from 'react'
import Radio from './Radio'

export interface RadioGroupProps extends Omit<IComponentProps, 'value' | 'onChange'> {
  value?: IValueType
  options?: IOptionType[]
  disabled?: boolean
  onChange?: (value: IValueType) => void
}

const Group: FC<RadioGroupProps> = ({
  className,
  value = [],
  options,
  disabled,
  onChange,
  ...restProps
}) => {
  function handleChange(checked: boolean, optionValue?: IValueType) {
    if (onChange && checked) {
      onChange(optionValue!)
    }
  }

  const handleChangeCallback = useCallback(handleChange, [])

  return (
    <div className={clsx('radio-group', className)} {...restProps}>
      {options?.map(option => (
        <Radio
          key={option.value.toString()}
          value={option.value}
          checked={value === option.value}
          disabled={'disabled' in option ? option.disabled : disabled}
          onChange={handleChangeCallback}
        >
          {option.label}
        </Radio>
      ))}
    </div>
  )
}

export default Group
