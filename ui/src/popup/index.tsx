import type { Options as PopperOptions } from '@popperjs/core/lib/types'
import clsx from 'clsx'
import type { FC, ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePopper } from 'react-popper'
import { useTransition } from 'react-transition-state'
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
  const {
    styles: { popper }
  } = usePopper(referenceRef, popperRef, popperOptions)

  function handleStateChange({ state }: any) {
    if (state === 'unmounted') {
      onExited?.()
    }
  }

  const [state, toggle] = useTransition({
    timeout: duration,
    initialEntered: visible,
    preEnter: true,
    preExit: true,
    unmountOnExit: true,
    onChange: handleStateChange
  })

  function handleMaskClick(event: any) {
    stopEvent(event)

    if (maskClosable) {
      toggle(false)
    }
  }

  const handleMaskClickCallback = useCallback(handleMaskClick, [])

  useEffect(() => {
    toggle(visible)
  }, [visible])

  const memoPopup = useMemo(
    () => (
      <div className={clsx('popup', `${transitionName}-${state}`, className)} {...restProps}>
        {mask && <div className="popup-mask" onClick={handleMaskClickCallback} />}
        <div
          ref={setPopperRef}
          className={clsx('popup-content', `popup-placement-${popperOptions.placement}`)}
          style={{
            ...style,
            ...popper,
            transitionDuration: `${duration}ms`
          }}
        >
          {children}
        </div>
      </div>
    ),
    [children, state, popper]
  )
  const memoPortal = useMemo(() => <Portal visible={true}>{memoPopup}</Portal>, [memoPopup])

  return <>{state !== 'unmounted' && state !== 'exited' && memoPortal}</>
}

export default Popup
