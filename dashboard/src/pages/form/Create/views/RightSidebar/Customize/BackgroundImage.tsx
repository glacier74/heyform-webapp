import { PhotoPicker } from '@/components'
import { useStore } from '@/store'
import { Button } from '@heyforms/ui'
import { isURL } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useState } from 'react'

export const BackgroundImage: FC = observer(() => {
  const formStore = useStore('formStore')
  const [visible, setVisible] = useState(false)

  const isEnabled = isURL(formStore.theme.backgroundImage)

  function handleOpen() {
    setVisible(true)
  }

  function handleClose() {
    setVisible(false)
  }

  function handleChange(value: string) {}

  function handleRemove() {}

  return (
    <>
      <div className="right-sidebar-group">
        <div className="flex items-center justify-between">
          <label className="form-item-label">Background image</label>
          {isEnabled ? (
            <div className="flex items-center">
              <Button className="px-2 py-1 mr-2" onClick={handleOpen}>
                Change
              </Button>
              <Button className="px-2 py-1" onClick={handleRemove}>
                Remove
              </Button>
            </div>
          ) : (
            <Button className="px-2 py-1" onClick={handleOpen}>
              Add
            </Button>
          )}
        </div>
      </div>

      <PhotoPicker visible={visible} onClose={handleClose} onChange={handleChange} />
    </>
  )
})
