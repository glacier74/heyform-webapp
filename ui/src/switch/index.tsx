import clsx from 'clsx'
import type { FC } from 'react'
import { useState } from 'react'
import Spin from '../spin'

export interface SwitchProps extends Omit<IComponentProps, 'onChange'> {
  loading?: boolean
  disabled?: boolean
  value?: boolean
  onChange?: (value: boolean) => void
}

const Switch: FC<SwitchProps> = ({
  className,
  value: rawValue = false,
  loading = false,
  disabled,
  onChange,
  ...restProps
}) => {
  const [value, setValue] = useState(rawValue)

  function handleClick() {
    setValue(!value)
    onChange && onChange(!value)
  }

  return (
    <button
      className={clsx('switch', className, {
        'switch-checked': value
      })}
      role="switch"
      type="button"
      tabIndex={0}
      aria-checked={value}
      disabled={loading || disabled}
      onClick={handleClick}
      {...restProps}
    >
      <span className="switch-handle" aria-hidden="true">
        {loading && <Spin />}
      </span>
    </button>
  )
}

export default Switch
