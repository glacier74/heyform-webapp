import clsx from 'clsx'
import type { FC, ReactNode } from 'react'

export interface TabsPaneProps extends IComponentProps {
  isActive?: boolean

  // Only for tabs
  disabled?: boolean
  title?: string
  leading?: ReactNode
}

const TabsPane: FC<TabsPaneProps> = ({ isActive, children, className, ...restProps }) => {
  return (
    <div
      className={clsx('tabs-pane', className, {
        'tabs-pane-active': isActive
      })}
      {...restProps}
    >
      {children}
    </div>
  )
}

export default TabsPane
