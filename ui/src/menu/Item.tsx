import { CheckIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import type { FC, MouseEvent, ReactNode } from 'react'

export interface MenuItemProps extends Omit<IComponentProps, 'onClick'> {
  icon?: ReactNode
  name?: IKeyType
  label: ReactNode
  isChecked?: boolean
  onClick?: (name?: IKeyType, event?: MouseEvent<HTMLDivElement>) => void
}

const MenuItem: FC<MenuItemProps> = ({
  className,
  icon,
  name,
  label,
  isChecked,
  onClick,
  ...restProps
}) => {
  function handleClick(event: MouseEvent<HTMLDivElement>) {
    onClick && onClick(name, event)
  }

  return (
    <div
      className={clsx('menu-item', className)}
      role="menuitem"
      onClick={handleClick}
      {...restProps}
    >
      <div className="menu-item-content">
        {icon}
        <div className="menu-item-label">{label}</div>
      </div>
      {isChecked && <CheckIcon className="menu-item-checkmark" />}
    </div>
  )
}

export default MenuItem
