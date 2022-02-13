import clsx from 'clsx'
import type { FC } from 'react'

const Navbar: FC<IComponentProps> = ({ className, children, ...restProps }) => {
  return (
    <div className={clsx('navbar', className)} {...restProps}>
      <nav aria-label="Tabs">{children}</nav>
    </div>
  )
}

export default Navbar
