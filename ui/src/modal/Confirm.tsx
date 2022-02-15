import { CheckIcon, ExclamationIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import type { FC, ReactNode } from 'react'
import Button from '../button/Button'
import type { ModalProps } from './Modal'
import Modal from './Modal'

export interface ConfirmModalProps extends Omit<ModalProps, 'title'> {
  type: 'primary' | 'danger' | 'success'
  title?: ReactNode
  description?: ReactNode
  cancelLabel?: string
  confirmLabel?: string
  maskClosable?: boolean
  loading?: boolean
  onCancel?: (event?: any) => void
  onConfirm?: (event?: any) => void
}

const Confirm: FC<ConfirmModalProps> = ({
  className,
  type,
  title,
  description,
  cancelLabel,
  confirmLabel,
  maskClosable,
  loading,
  onCancel,
  onConfirm,
  ...restProps
}) => {
  function handleCancelClick() {
    if (!loading) {
      onCancel && onCancel()
    }
  }

  function handleClose() {
    if (maskClosable) {
      handleCancelClick()
    }
  }

  return (
    <Modal
      className="modal-confirm"
      maskClosable={maskClosable}
      loading={loading}
      onClose={handleClose}
      {...restProps}
    >
      <div className={clsx('modal-icon', `modal-icon-${type}`)}>
        {type === 'success' ? <CheckIcon /> : <ExclamationIcon />}
      </div>
      <div className="modal-content">
        <h3 className="modal-title">{title}</h3>
        <div className="modal-description">{description}</div>
      </div>
      <div className="modal-actions">
        {cancelLabel && <Button onClick={handleCancelClick}>{cancelLabel}</Button>}
        {confirmLabel && (
          <Button type={type} loading={loading} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        )}
      </div>
    </Modal>
  )
}

export default Confirm
