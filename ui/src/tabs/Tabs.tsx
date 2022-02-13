import clsx from 'clsx'
import type { FC, ReactElement, ReactNode } from 'react'
import { Children, useMemo, useState } from 'react'
import Button from '../button'
import TabsPane from './Pane'

export interface TabsProps extends Omit<IComponentProps, 'onChange'> {
  defaultActiveKey?: IKeyType
  onChange?: (key: IKeyType) => void
}

export interface TabButtonProps extends Omit<IComponentProps, 'onClick'> {
  tabKey: string
  title: string
  isActive?: boolean
  disabled?: boolean
  leading?: ReactNode
  onClick?: (key: IKeyType) => void
}

const TabButton: FC<TabButtonProps> = ({
  tabKey,
  title,
  isActive,
  disabled,
  leading,
  onClick,
  ...restProps
}) => {
  function handleClick() {
    onClick && onClick(tabKey)
  }

  return (
    <Button
      className={clsx('tabs-button', {
        'tabs-button-active': isActive
      })}
      disabled={disabled}
      leading={leading}
      tabIndex={0}
      onClick={handleClick}
      {...restProps}
    >
      {title}
    </Button>
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
      <div className="tabs-button-group">
        {panes.map(node => (
          <TabButton
            key={node.key}
            tabKey={node.key as string}
            title={node.title}
            leading={node.leading}
            disabled={node.disabled}
            isActive={node.key === activeKey}
            onClick={handleClick}
          />
        ))}
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
