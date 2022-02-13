import clsx from 'clsx'
import type { FC, ReactNode } from 'react'
import Checkbox from './Checkbox'

export interface CheckboxOptionType {
  label: ReactNode
  value: IValueType
  disabled?: boolean
}

export interface CheckboxGroupProps extends Omit<IComponentProps<HTMLDivElement>, 'onChange'> {
  value?: IValueType[]
  options?: CheckboxOptionType[]
  disabled?: boolean
  onChange?: (value: IValueType[]) => void
}

const Group: FC<CheckboxGroupProps> = ({
  className,
  value = [],
  options,
  disabled,
  onChange,
  ...restProps
}) => {
  function handleChange(checked: boolean, optionValue?: IValueType) {
    if (onChange) {
      const newValue = checked ? [...value, optionValue] : value.filter(v => v !== optionValue)
      onChange(newValue as IValueType[])
    }
  }

  return (
    <div className={clsx('checkbox-group', className)} {...restProps}>
      {options?.map(option => (
        <Checkbox
          key={option.value.toString()}
          value={option.value}
          checked={value?.includes(option.value)}
          disabled={'disabled' in option ? option.disabled : disabled}
          onChange={handleChange}
        >
          {option.label}
        </Checkbox>
      ))}
    </div>
  )
}

export default Group
