import { Avatar, Button, Modal, Tabs } from '@heyforms/ui'
import clsx from 'clsx'
import type { FC } from 'react'
import { DragUploader } from './DragUploader'
import { Unsplash } from './Unsplash'
import './style.scss'

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
  return (
    <Modal className="photo-picker" visible={true} onClose={onClose} showCloseIcon {...restProps}>
      <Tabs>
        <Tabs.Pane key="upload" title="Upload">
          <DragUploader />
        </Tabs.Pane>
        <Tabs.Pane key="unsplash" title="Unsplash">
          <Unsplash onSelect={console.log} />
        </Tabs.Pane>
      </Tabs>
    </Modal>
  )
}
