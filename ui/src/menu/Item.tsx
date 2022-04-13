import { CheckIcon } from '@heroicons/react/outline'
import { isValid } from '@hpnp/utils/helper'
import clsx from 'clsx'
import type { FC, MouseEvent, ReactNode } from 'react'
import { useContext, useEffect } from 'react'
import { MenusStoreContext } from './context'

export interface MenuItemProps extends Omit<IComponentProps, 'onClick'> {
  icon?: ReactNode
  name?: IKeyType
  label: ReactNode
  disabled?: boolean
  isChecked?: boolean
  onClick?: (name?: IKeyType, event?: MouseEvent<HTMLDivElement>) => void
}

const MenuItem: FC<MenuItemProps> = ({
  className,
  icon,
  name,
  label,
  disabled = false,
  isChecked,
  onClick,
  ...restProps
}) => {
  const { state, dispatch } = useContext(MenusStoreContext)

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if (!disabled) {
      onClick?.(name, event)
      state.onClick?.(name)
    }
  }

  useEffect(() => {
    if (isValid(name) && !disabled) {
      dispatch({
        type: 'register',
        payload: {
          name: name!
        }
      })
    }

    return () => {
      if (isValid(name) && !disabled) {
        dispatch({
          type: 'unregister',
          payload: {
            name: name!
          }
        })
      }
    }
  }, [])

  return (
    <div
      className={clsx(
        'menu-item',
        {
          'menu-item-highlighted': !disabled && isValid(name) && state.highlighted === name,
          'menu-item-disabled': disabled
        },
        className
      )}
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

export default MenuItem;
