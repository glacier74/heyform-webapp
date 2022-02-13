import clsx from 'clsx'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

export interface NavigationProps extends IComponentProps {
  to: any
  icon?: ReactNode
  badge?: ReactNode
}

const Navigation: FC<NavigationProps> = ({
  className,
  to,
  icon,
  badge,
  children,
  ...restProps
}) => {
  return (
    <NavLink className={clsx('navigation', className)} to={to} {...restProps}>
      {icon}
      <span className="navigation-title">{children}</span>
      {badge}
    </NavLink>
  )
}

export default Navigation
