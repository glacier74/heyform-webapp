import clsx from 'clsx'
import type { FC, ReactNode } from 'react'

export interface EmptyStatesProps extends IComponentProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

const EmptyStates: FC<EmptyStatesProps> = ({
  className,
  icon,
  title,
  description,
  action,
  ...restProps
}) => {
  return (
    <div className={clsx('empty-states', className)} {...restProps}>
      {icon && <div className="empty-states-icon">{icon}</div>}
      <h3 className="empty-states-title">{title}</h3>
      {description && <p className="empty-states-description">{description}</p>}
      {action && <div className="empty-states-action">{action}</div>}
    </div>
  )
}

export default EmptyStates
