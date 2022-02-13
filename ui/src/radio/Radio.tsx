import clsx from 'clsx'
import type { ChangeEvent, FC } from 'react'

export interface RadioProps extends Omit<IComponentProps, 'onChange'> {
  checked?: boolean
  disabled?: boolean
  value?: IValueType
  onChange?: (checked: boolean, value?: IValueType) => void
}

const Radio: FC<RadioProps> = ({
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
    <label className={clsx('radio-wrapper', className)}>
      <span className="radio">
        <input
          className="radio-input"
          type="radio"
          value={value?.toString()}
          disabled={disabled}
          checked={checked}
          onChange={handleChange}
          {...restProps}
        />
      </span>
      <span className="radio-description">{children}</span>
    </label>
  )
}

export default Radio
