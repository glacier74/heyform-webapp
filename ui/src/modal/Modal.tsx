import { XIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import type { FC } from 'react'
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import Button from '../button'
import { useOnClickOutside } from '../hook'
import Portal from '../portal'

export interface ModalProps extends IComponentProps {
  wrapperClassName?: string
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
  visible,
  maskClosable = true,
  showCloseIcon = false,
  confirmLoading = false,
  unmountOnExit = true,
  children,
  onClose,
  onExited,
  ...restProps
}) => {
  const bodyRef = useRef<HTMLDivElement | null>(null)

  function handleClose() {
    if (maskClosable && !confirmLoading) {
      onClose && onClose()
    }
  }

  // Close modal when only click on .modal-container
  useOnClickOutside(bodyRef, handleClose)

  return (
    <CSSTransition
      in={visible}
      timeout={100}
      classNames="popup-modal"
      unmountOnExit={unmountOnExit}
      onExited={onExited}
    >
      <Portal visible={visible}>
        <div className={clsx('modal', className)} {...restProps}>
          <div className="modal-container">
            <div ref={bodyRef} className={clsx('modal-wrapper', wrapperClassName)}>
              <div className="modal-body scrollbar">
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
