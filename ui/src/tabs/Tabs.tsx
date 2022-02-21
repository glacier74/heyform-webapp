import clsx from 'clsx'
import type { FC, ReactElement, MouseEvent } from 'react'
import { Children, useMemo, useState } from 'react'
import TabsPane from './Pane'

export interface TabsProps extends Omit<IComponentProps, 'onChange'> {
  defaultActiveKey?: IKeyType
  onChange?: (key: IKeyType) => void
}

export interface TabLinkProps extends Omit<IComponentProps, 'onClick'> {
  tabKey: string
  title: string
  isActive?: boolean
  disabled?: boolean
  onClick?: (key: IKeyType) => void
}

const TabLink: FC<TabLinkProps> = ({
  tabKey,
  title,
  isActive,
  disabled,
  onClick,
  ...restProps
}) => {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    onClick && onClick(tabKey)
  }

  return (
    <a
      className={clsx('tabs-nav-link', {
        'tabs-nav-link-active': isActive
      })}
      onClick={handleClick}
      {...restProps}
    >
      {title}
    </a>
  )
}

const Tabs: FC<TabsProps> = ({ defaultActiveKey, onChange, children, className, ...restProps }) => {
  const panes = useMemo(
    () =>
      Children.map(children as ReactElement[], node => ({
        key: node.key,
        title: node.props.title,
        disabled: node.props.disabled,
        leading: node.props.leading,
        children: node.props.children
      })),
    []
  )
  const [activeKey, setActiveKey] = useState(defaultActiveKey || panes[0].key!)

  function handleClick(key: IKeyType) {
    setActiveKey(key)
    onChange && onChange(key)
  }

  return (
    <div className={clsx('tabs-wrapper', className)} {...restProps}>
      <div className="tabs-navbar">
        <div className="tabs-nav-links">
          {panes.map(node => (
            <TabLink
              key={node.key}
              tabKey={node.key as string}
              title={node.title}
              disabled={node.disabled}
              isActive={node.key === activeKey}
              onClick={handleClick}
            />
          ))}
        </div>
      </div>
      <div className="tabs-pane-group">
        {panes.map(node => (
          <TabsPane key={node.key!} isActive={node.key === activeKey}>
            {node.children}
          </TabsPane>
        ))}
      </div>
    </div>
  )
}

export default Tabs
