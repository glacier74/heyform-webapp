import clsx from 'clsx'
import type { FC, ReactNode } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useOnClickOutside } from '../hook'

export interface DropdownProps extends IComponentProps {
  visible?: boolean
  placement?: 'left' | 'right'
  disabled?: boolean
  unmountOnExit?: boolean
  overlay: ReactNode
}

const Dropdown: FC<DropdownProps> = ({
  className,
  visible = false,
  placement = 'right',
  disabled,
  unmountOnExit = true,
  overlay,
  children,
  ...restProps
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(visible)

  function handleExited() {
    setIsOpen(false)
  }

  function handleClick() {
    setIsOpen(v => !v)
  }

  // Hide the list when the user clicks outside it
  useOnClickOutside(ref, () => setIsOpen(false))

  useEffect(() => {
    setIsOpen(visible)
  }, [visible])

  const handleExitedCallback = useCallback(handleExited, [])

  return (
    <div
      ref={ref}
      className={clsx('dropdown', `dropdown-top-${placement}`, className)}
      {...restProps}
    >
      <div onClick={handleClick}>{children}</div>

      <CSSTransition
        in={isOpen}
        timeout={0}
        classNames="dropdown-popup"
        unmountOnExit={unmountOnExit}
        onExited={handleExitedCallback}
      >
        {overlay}
      </CSSTransition>
    </div>
  )
}

export default Dropdown
