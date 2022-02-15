import clsx from 'clsx'
import type { FC } from 'react'

const MenuDivider: FC<IComponentProps<HTMLDivElement>> = ({ className, ...restProps }) => {
  return <div className={clsx('menu-divider', className)} role="none" {...restProps} />
}

export default MenuDivider
