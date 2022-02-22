import { Switch } from '@heyforms/ui'
import type { SwitchProps } from '@heyforms/ui/lib/types/switch'
import clsx from 'clsx'
import type { FC, ReactNode } from 'react'

interface SwitchFieldProps extends SwitchProps {
  label?: ReactNode
  description?: ReactNode
}

export const SwitchField: FC<SwitchFieldProps> = ({
  id,
  className,
  label,
  description,
  style,
  ...restProps
}) => {
  return (
    <div className={clsx('form-switch-item', className)} style={style}>
      <div className="form-switch-item-container">
        <div className="form-switch-item-left">
          <label className="form-item-label" htmlFor={id}>
            {label}
          </label>
          <p className="form-item-description">{description}</p>
        </div>
        <Switch id={id} {...restProps} />
      </div>
    </div>
  )
}
