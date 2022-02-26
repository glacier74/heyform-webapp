import type { Options as PopperOptions } from '@popperjs/core/lib/types'
import clsx from 'clsx'
import type { FC, ReactNode } from 'react'
import { useCallback, useMemo, useState } from 'react'
import { usePopper } from 'react-popper'
import { CSSTransition } from 'react-transition-group'
import Portal from '../portal'
import { stopEvent } from '../utils'

export interface PopupProps extends Omit<IComponentProps, 'children'> {
  visible?: boolean
  transitionName?: string
  duration?: number
  mask?: boolean
  maskClosable?: boolean
  referenceRef: Element
  popperOptions: Partial<PopperOptions>
  children: ReactNode
  onExited?: () => void
}

const Popup: FC<PopupProps> = ({
  className,
  style,
  transitionName = 'popup-transition',
  duration = 100,
  visible = false,
  mask = true,
  maskClosable = true,
  referenceRef,
  popperOptions,
  children,
  onExited,
  ...restProps
}) => {
  const [popperRef, setPopperRef] = useState<HTMLDivElement | null>(null)
  const { styles, attributes } = usePopper(referenceRef, popperRef, popperOptions)

  function handleExited() {
    onExited?.()
  }

  function handleMaskClick(event: any) {
    stopEvent(event)

    if (maskClosable) {
      handleExited()
    }
  }

  const handleExitedCallback = useCallback(handleExited, [])
  const handleMaskClickCallback = useCallback(handleMaskClick, [])

  const memoPopup = useMemo(
    () => (
      <div className={clsx('popup', className)} {...restProps}>
        {mask && <div className="popup-mask" onClick={handleMaskClickCallback} />}
        <div
          ref={setPopperRef}
          className={clsx('popup-content', `popup-placement-${popperOptions.placement}`)}
          style={{
            ...style,
            ...styles.popper
          }}
          {...attributes.popper}
        >
          {children}
        </div>
      </div>
    ),
    [children, styles, attributes]
  )
  const memoPortal = useMemo(() => <Portal visible={true}>{memoPopup}</Portal>, [memoPopup])

  return (
    <CSSTransition
      classNames={transitionName}
      in={visible}
      timeout={duration}
      unmountOnExit={true}
      onExited={handleExitedCallback}
    >
      {memoPortal}
    </CSSTransition>
  )
}

export default Popup
