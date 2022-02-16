import { Switch } from '@heyforms/ui'
import type { SwitchProps } from '@heyforms/ui/lib/types/switch'
import clsx from 'clsx'
import type { FC, ReactNode } from 'react'

interface SwitchFieldProps extends SwitchProps {
  label?: ReactNode
  description?: ReactNode
}

export const SwitchField: FC<SwitchFieldProps> = ({
  className,
  label,
  description,
  style,
  ...restProps
}) => {
  return (
    <div className={clsx('form-item form-switch-item', className)} style={style}>
      <div className="form-switch-item-container">
        <div className="form-switch-item-left">
          <p className="form-item-label">{label}</p>
          <p className="form-item-description">{description}</p>
        </div>
        <Switch {...restProps} />
      </div>
    </div>
  )
}
