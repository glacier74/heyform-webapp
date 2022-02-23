import { Modal, Tabs } from '@heyforms/ui'
import type { FC } from 'react'
import { DragUploader } from './DragUploader'
import './style.scss'
import { Unsplash } from './Unsplash'

interface PhotoPickerProps extends Omit<IComponentProps, 'onChange'>, IModalProps {
  value?: string
  onChange?: (value: string) => void
}

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
        <Tabs.Pane key="upload" title="Upload">
          <DragUploader onChange={handleChange} />
        </Tabs.Pane>
        <Tabs.Pane key="unsplash" title="Unsplash">
          <Unsplash onChange={handleChange} />
        </Tabs.Pane>
      </Tabs>
    </Modal>
  )
}
