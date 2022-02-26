import { XIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import type { FC } from 'react'
import { useCallback, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import Button from '../button'
import Portal from '../portal'
import { KeyCode, stopPropagation } from '../utils'

export interface ModalProps extends IComponentProps {
  contentClassName?: string
  visible?: boolean
  maskClosable?: boolean
  showCloseIcon?: boolean
  confirmLoading?: boolean
  unmountOnExit?: boolean
  onClose?: () => void
  onExited?: () => void
}

const Modal: FC<ModalProps> = ({
  className,
  contentClassName,
  visible,
  maskClosable = true,
  showCloseIcon = false,
  confirmLoading = false,
  unmountOnExit = true,
  style,
  children,
  onClose,
  onExited,
  ...restProps
}) => {
  const ref = useRef<HTMLDivElement>(null)

  function handleClose() {
    if (maskClosable && !confirmLoading) {
      onClose && onClose()
    }
  }

  function handleMaskClick(event: any) {
    stopPropagation(event)

    if (!ref.current || ref.current.contains(event.target as Node)) {
      return
    }

    handleClose()
  }

  function handleKeyDown(event: any) {
    if (event.keyCode === KeyCode.ESC) {
      stopPropagation(event)
      handleClose()
    }
  }

  const handleCloseCallback = useCallback(handleClose, [])

  return (
    <CSSTransition
      in={visible}
      timeout={100}
      classNames="modal-transition"
      unmountOnExit={unmountOnExit}
      onExited={onExited}
    >
      <Portal visible={visible}>
        <div className={clsx('modal-root', className)} {...restProps}>
          <div className="modal-mask" onClick={handleCloseCallback} />
          <div
            className="modal-container"
            tabIndex={-1}
            role="dialog"
            onKeyDown={handleKeyDown}
            onClick={handleMaskClick}
          >
            <div ref={ref} className={clsx('modal-content', contentClassName)} style={style}>
              <div className="modal-body">
                {showCloseIcon && (
                  <Button.Link
                    className="modal-close-button"
                    leading={<XIcon aria-hidden="true" />}
                    onClick={handleClose}
                  />
                )}
                {children}
              </div>
            </div>
          </div>
        </div>
      </Portal>
    </CSSTransition>
  )
}

export default Modal
