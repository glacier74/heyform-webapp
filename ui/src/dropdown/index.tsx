import type { Placement as PopperPlacement } from '@popperjs/core'
import clsx from 'clsx'
import type { FC, ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import Popup from '../popup'

export interface DropdownProps extends IComponentProps {
  visible?: boolean
  placement?: PopperPlacement
  disabled?: boolean
  dismissOnClickInside?: boolean
  overlay: ReactNode
}

const Dropdown: FC<DropdownProps> = ({
  className,
  visible = false,
  placement = 'bottom-end',
  disabled,
  dismissOnClickInside = true,
  overlay,
  children,
  ...restProps
}) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(visible)

  function handleExited() {
    setIsOpen(false)
  }

  function handleClick() {
    setIsOpen(true)
  }

  function handleDropdownClick() {
    if (dismissOnClickInside) {
      setIsOpen(false)
    }
  }

  // Trigger dropdown open or not outside
  useEffect(() => {
    setIsOpen(visible)
  }, [visible])

  const memoOverlay = useMemo(() => {
    return (
      <div className="dropdown-body" onClick={handleDropdownClick}>
        {overlay}
      </div>
    )
  }, [])

  return (
    <>
      <div
        ref={setRef}
        className={clsx('dropdown', className)}
        onClick={handleClick}
        {...restProps}
      >
        {children}
      </div>

      <Popup
        visible={isOpen}
        referenceRef={ref as Element}
        popperOptions={{
          placement,
          strategy: 'fixed',
          modifiers: [
            {
              name: 'computeStyles',
              options: {
                gpuAcceleration: false
              }
            }
          ]
        }}
        onExited={handleExited}
      >
        {memoOverlay}
      </Popup>
    </>
  )
}

export default Dropdown
