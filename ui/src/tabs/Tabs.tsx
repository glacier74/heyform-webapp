import clsx from 'clsx'
import type { FC, MouseEvent } from 'react'
import { memo, useCallback, useContext, useMemo, useReducer } from 'react'
import { stopPropagation } from '../utils'
import { TabsStoreContext, tabsStoreReducer } from './context'

export interface TabsProps extends Omit<IComponentProps, 'onChange'> {
  defaultActiveName?: IKeyType
  onChange?: (key: IKeyType) => void
}

export interface TabLinkProps extends Omit<IComponentProps, 'onClick'> {
  name: string
  title: string
  isActive?: boolean
  disabled?: boolean
  onClick: (key: IKeyType) => void
}

const TabLink: FC<TabLinkProps> = ({ name, title, isActive, disabled, onClick, ...restProps }) => {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    stopPropagation(event)
    onClick(name)
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

const TabLinkListComponent: FC = () => {
  const { state, dispatch } = useContext(TabsStoreContext)

  function handleClick(name: IKeyType) {
    dispatch({
      type: 'setActive',
      payload: name
    })
    state.onChange?.(name)
  }

  const handleClickCallback = useCallback(handleClick, [])

  return (
    <div className="tabs-nav-links">
      {state.tabs.map(tab => (
        <TabLink
          key={tab.name}
          name={tab.name as string}
          title={tab.title}
          disabled={tab.disabled}
          isActive={tab.name === state.activeName}
          onClick={handleClickCallback}
        />
      ))}
    </div>
  )
}

const TabLinkList = memo(TabLinkListComponent)

const Tabs: FC<TabsProps> = ({
  className,
  defaultActiveName,
  onChange,
  children,
  ...restProps
}) => {
  const [state, dispatch] = useReducer(tabsStoreReducer, {
    tabs: [],
    activeName: defaultActiveName,
    onChange
  })
  const storeValue = useMemo(() => ({ state, dispatch }), [state])

  return (
    <TabsStoreContext.Provider value={storeValue}>
      <div className={clsx('tabs-wrapper', className)} {...restProps}>
        <div className="tabs-navbar">
          <TabLinkList />
        </div>
        <div className="tabs-pane-group">{children}</div>
      </div>
    </TabsStoreContext.Provider>
  )
}

export default Tabs
