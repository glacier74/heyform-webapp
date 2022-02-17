import clsx from 'clsx'
import type { FC, ReactElement } from 'react'
import { Children, cloneElement } from 'react'

export interface MenusProps extends Omit<IComponentProps<HTMLDivElement>, 'onClick'> {
  onClick?: (name?: IKeyType) => void
}

const Menus: FC<MenusProps> = ({ className, children, onClick, ...restProps }) => {
  return (
    <div className={clsx('menus', className)} role="menu" {...restProps}>
      {Children.toArray(children).map(child => {
        return cloneElement(child as ReactElement, {
          ...(child as ReactElement).props,
          onClick
        })
      })}
    </div>
  )
}

export default Menus
