import type { Placement as PopperPlacement } from '@popperjs/core'
import clsx from 'clsx'
import type { FC, MouseEvent, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import Popup from '../popup'
import { stopEvent } from '../utils'

export interface DropdownProps extends IComponentProps {
  popupClassName?: string
  visible?: boolean
  placement?: PopperPlacement
  disabled?: boolean
  dismissOnClickInside?: boolean
  overlay: ReactNode
  onVisibleChange?: (visible: boolean) => void
}

const Dropdown: FC<DropdownProps> = ({
  className,
  popupClassName,
  visible = false,
  placement = 'bottom-end',
  disabled,
  dismissOnClickInside = true,
  overlay,
  children,
  onVisibleChange,
  ...restProps
}) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(visible)

  function handleExited() {
    setIsOpen(false)
  }

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    stopEvent(event)
    setIsOpen(true)
  }

  function handleDropdownClick(event: MouseEvent<HTMLDivElement>) {
    stopEvent(event)

    if (dismissOnClickInside) {
      setIsOpen(false)
    }
  }

  // Trigger dropdown open or not outside
  useEffect(() => {
    setIsOpen(visible)
  }, [visible])

  // Visible change callback
  useEffect(() => {
    onVisibleChange?.(isOpen)
  }, [isOpen])

  const memoOverlay = (
    <div className="dropdown-body" onClick={handleDropdownClick}>
      {overlay}
    </div>
  )

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
        className={popupClassName}
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
