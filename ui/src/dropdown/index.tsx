import clsx from 'clsx'
import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useOnClickOutside } from '../hook'

export interface DropdownProps extends IComponentProps {
  visible?: boolean
  placement?: 'left' | 'right'
  disabled?: boolean
  dismissOnClickInside?: boolean
  overlay: ReactNode
}

const Dropdown: FC<DropdownProps> = ({
  className,
  visible = false,
  placement = 'right',
  disabled,
  dismissOnClickInside = true,
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
    if (dismissOnClickInside) {
      setIsOpen(!isOpen)
    }
  }

  // Hide the list when the user clicks outside it
  useOnClickOutside(ref, () => setIsOpen(false))

  // Trigger dropdown open or not outside
  useEffect(() => {
    setIsOpen(visible)
  }, [visible])

  const handleExitedCallback = useCallback(handleExited, [])

  return (
    <div
      ref={ref}
      className={clsx('dropdown', `dropdown-top-${placement}`, className)}
      onClick={handleClick}
      {...restProps}
    >
      <div className="dropdown-trigger">{children}</div>
      <CSSTransition
        in={isOpen}
        timeout={0}
        classNames="dropdown-popup"
        mountOnEnter={true}
        unmountOnExit={false}
        onExited={handleExitedCallback}
      >
        {overlay}
      </CSSTransition>
    </div>
  )
}

export default Dropdown
