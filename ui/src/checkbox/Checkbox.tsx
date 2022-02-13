import clsx from 'clsx'
import type { ChangeEvent, FC } from 'react'

export interface CheckboxProps extends Omit<IComponentProps, 'onChange'> {
  checked?: boolean
  disabled?: boolean
  value?: IValueType
  onChange?: (checked: boolean, value?: IValueType) => void
}

const Checkbox: FC<CheckboxProps> = ({
  className,
  value,
  checked,
  disabled,
  children,
  onChange,
  ...restProps
}) => {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const isChecked = event.target.checked
    onChange && onChange(isChecked, value)
  }

  return (
    <label className={clsx('checkbox-wrapper', className)}>
      <span className="checkbox">
        <input
          className="checkbox-input"
          type="checkbox"
          value={value?.toString()}
          disabled={disabled}
          checked={checked}
          onChange={handleChange}
          {...restProps}
        />
      </span>
      <span className="checkbox-description">{children}</span>
    </label>
  )
}

export default Checkbox
