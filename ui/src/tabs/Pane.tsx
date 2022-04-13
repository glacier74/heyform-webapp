import clsx from 'clsx'
import type { FC } from 'react'
import { useContext, useEffect } from 'react'
import { TabsStoreContext } from './context'

export interface TabsPaneProps extends Omit<IComponentProps, 'title'> {
  name: IKeyType
  title: string
  disabled?: boolean
}

const TabsPane: FC<TabsPaneProps> = ({
  name,
  title,
  disabled,
  children,
  className,
  ...restProps
}) => {
  const { state, dispatch } = useContext(TabsStoreContext)

  useEffect(() => {
    dispatch({
      type: 'register',
      payload: {
        name,
        title,
        disabled
      }
    })

    return () => {
      dispatch({
        type: 'unregister',
        payload: name
      })
    }
  }, [])

  return (
    <div
      className={clsx(
        'tabs-pane',
        {
          'tabs-pane-active': state.activeName === name
        },
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  )
}

export default TabsPane;
