import { XIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import type { FC } from 'react'
import { CSSTransition } from 'react-transition-group'
import Button from '../button'
import Portal from '../portal'

export interface ModalProps extends IComponentProps {
  wrapperClassName?: string
  zIndex?: number
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
  wrapperClassName,
  zIndex = 40,
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
  function handleClose() {
    if (maskClosable && !confirmLoading) {
      onClose && onClose()
    }
  }

  return (
    <CSSTransition
      in={visible}
      timeout={100}
      classNames="popup-modal"
      unmountOnExit={unmountOnExit}
      onExited={onExited}
    >
      <Portal visible={visible}>
        <div
          className={clsx('modal', className)}
          style={{
            zIndex,
            ...style
          }}
          {...restProps}
        >
          <div
            className="modal-mask"
            style={{
              zIndex: zIndex + 1
            }}
            onClick={handleClose}
          />
          <div
            className="modal-container"
            style={{
              zIndex: zIndex + 2
            }}
          >
            <div className={clsx('modal-wrapper', wrapperClassName)}>
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
