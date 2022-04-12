import { Modal, Tabs } from '@heyforms/ui'
import type { FC } from 'react'
import { QiniuUploader } from '../QiniuUploader'
import './style.scss'
import { Unsplash } from './Unsplash'

interface PhotoPickerProps extends Omit<IComponentProps, 'onChange'>, IModalProps {
  value?: string
  onChange?: (value: string) => void
}

const ACCEPTED_MIMES = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif']

export const PhotoPicker: FC<PhotoPickerProps> = ({
  className,
  visible,
  value,
  onClose,
  onChange,
  ...restProps
}) => {
  function handleChange(src: string) {
    onChange?.(src)
    onClose?.()
  }

  return (
    <Modal
      className="photo-picker"
      visible={visible}
      onClose={onClose}
      showCloseIcon
      {...restProps}
    >
      <Tabs>
        <Tabs.Pane name="upload" title="Upload">
          <QiniuUploader accept={ACCEPTED_MIMES} onChange={handleChange} />
        </Tabs.Pane>
        <Tabs.Pane name="unsplash" title="Unsplash">
          <Unsplash onChange={handleChange} />
        </Tabs.Pane>
      </Tabs>
    </Modal>
  )
}
