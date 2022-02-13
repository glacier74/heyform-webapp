import type { CSSProperties, FC, RefObject } from 'react'
import { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import type { PortalProps } from '../portal'
import Portal from '../portal'
import { popupStyles } from '../utils'

export interface PopupProps extends PortalProps {
  className?: string
  style?: CSSProperties
  referenceRef?: RefObject<HTMLElement>
  stretch?: boolean
  onVisibleChange?: (visible: boolean) => void
}

const Popup: FC<PopupProps> = ({
  visible,
  container,
  className,
  style,
  referenceRef,
  stretch = false,
  children,
  onVisibleChange
}) => {
  const [portalStyle, setPortalStyle] = useState<CSSProperties>({})

  function handleExited() {
    onVisibleChange && onVisibleChange(false)
  }

  useEffect(() => {
    if (referenceRef?.current && visible) {
      const rect = referenceRef.current.getBoundingClientRect()
      setPortalStyle(popupStyles(rect, { stretch }))
    } else {
      setPortalStyle({})
    }
  }, [referenceRef, visible])

  return (
    <CSSTransition
      in={visible}
      timeout={{
        enter: 100,
        exit: 100
      }}
      classNames={{
        appear: 'popup-appear',
        appearActive: 'popup-appear-active',
        appearDone: 'popup-appear-done',
        enter: 'popup-enter',
        enterActive: 'popup-enter-active',
        enterDone: 'popup-enter-done',
        exit: 'popup-exit',
        exitActive: 'popup-exit-active',
        exitDone: 'popup-exit-done'
      }}
      unmountOnExit
      onExited={handleExited}
    >
      <Portal visible={true} container={container}>
        <div className={className} style={style}>
          <div className="popup-container" style={portalStyle}>
            {children}
          </div>
        </div>
      </Portal>
    </CSSTransition>
  )
}

export default Popup
