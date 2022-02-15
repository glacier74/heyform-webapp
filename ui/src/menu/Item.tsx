import clsx from 'clsx'
import type { FC, ReactNode } from 'react'

export interface MenuItemProps extends Omit<IComponentProps, 'onClick'> {
  icon?: ReactNode
  name?: IKeyType
  label: string
  onClick?: (name?: IKeyType) => void
}

const MenuItem: FC<MenuItemProps> = ({ className, icon, name, label, onClick, ...restProps }) => {
  function handleClick(event: any) {
    event.preventDefault()
    onClick && onClick(name)
  }

  return (
    <div
      className={clsx('menu-item', className)}
      role="menuitem"
      onClick={handleClick}
      {...restProps}
    >
      {icon}
      {label}
    </div>
  )
}

export default MenuItem
