import clsx from 'clsx'
import type { FC, MouseEvent, ReactNode } from 'react'
import { memo, useCallback, useContext, useMemo, useReducer } from 'react'
import { stopPropagation } from '../utils'
import { TabsStoreContext, TabsStoreReducer } from './context'
import type { ITab } from './context'

export interface TabsProps extends Omit<IComponentProps, 'onChange'> {
  defaultActiveName?: IKeyType
  navRender?: (tab: ITab, isActive?: boolean) => ReactNode
  onChange?: (key: IKeyType) => void
}

export interface TabNavProps
  extends Omit<IComponentProps, 'onClick'>,
    Pick<TabsProps, 'navRender'> {
  tab: ITab
  isActive?: boolean
  onClick: (key: IKeyType) => void
}

const Nav: FC<TabNavProps> = ({ tab, isActive, navRender, onClick, ...restProps }) => {
  function handleClick(event: MouseEvent<HTMLDivElement>) {
    stopPropagation(event)
    onClick(tab.name)
  }

  return (
    <div
      className={clsx('tabs-nav', {
        'tabs-nav-active': isActive
      })}
      onClick={handleClick}
      {...restProps}
    >
      {navRender ? navRender(tab, isActive) : tab.title}
    </div>
  )
}

const ListComponent: FC<Pick<TabsProps, 'navRender'>> = ({ navRender }) => {
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
    <div className="tabs-nav-list">
      {state.tabs.map(tab => (
        <Nav
          key={tab.name}
          tab={tab}
          isActive={tab.name === state.activeName}
          navRender={navRender}
          onClick={handleClickCallback}
        />
      ))}
    </div>
  )
}

const MemoList = memo(ListComponent)

const Tabs: FC<TabsProps> = ({
  className,
  defaultActiveName,
  children,
  navRender,
  onChange,
  ...restProps
}) => {
  const [state, dispatch] = useReducer(TabsStoreReducer, {
    tabs: [],
    activeName: defaultActiveName,
    onChange
  })
  const storeValue = useMemo(() => ({ state, dispatch }), [state])

  return (
    <TabsStoreContext.Provider value={storeValue}>
      <div className={clsx('tabs-wrapper', className)} {...restProps}>
        <div className="tabs-navbar">
          <MemoList navRender={navRender} />
        </div>
        <div className="tabs-pane-group">{children}</div>
      </div>
    </TabsStoreContext.Provider>
  )
}

export default Tabs
