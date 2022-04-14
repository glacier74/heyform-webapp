import { ImageIcon, PhotoPicker } from '@/components'
import { TrashIcon } from '@heroicons/react/outline'
import { Button } from '@heyforms/ui'
import { isURL } from '@hpnp/utils/helper'
import type { FC } from 'react'
import { useState } from 'react'

interface BackgroundImageProps {
  value?: string
  onChange?: (value?: string) => void
}

export const BackgroundImage: FC<BackgroundImageProps> = ({ value, onChange }) => {
  const [visible, setVisible] = useState(false)
  const isEnabled = isURL(value)

  function handleOpen() {
    setVisible(true)
  }

  function handleClose() {
    setVisible(false)
  }

  function handleChange(newValue: string) {
    onChange?.(newValue)
    handleClose()
  }

  function handleRemove() {
    onChange?.()
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <label className="form-item-label">Background image</label>
        {isEnabled ? (
          <div className="flex items-center">
            <Button
              className="px-2 py-1 mr-2 tooltip tooltip-top"
              data-tooltip="Change"
              leading={<ImageIcon />}
              onClick={handleOpen}
            />
            <Button
              className="px-2 py-1 tooltip tooltip-top"
              data-tooltip="Delete"
              leading={<TrashIcon />}
              onClick={handleRemove}
            />
          </div>
        ) : (
          <Button className="px-2 py-1" onClick={handleOpen}>
            Add
          </Button>
        )}
      </div>

      <PhotoPicker visible={visible} onClose={handleClose} onChange={handleChange} />
    </>
  )
}
