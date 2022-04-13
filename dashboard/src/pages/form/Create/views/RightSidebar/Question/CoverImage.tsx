import { PhotoPicker } from '@/components'
import { useStoreContext } from '@/pages/form/Create/store'
import { FieldLayoutAlignEnum } from '@heyforms/shared-types-enums'
import { Button } from '@heyforms/ui'
import { isURL } from '@hpnp/utils/helper'
import type { FC } from 'react'
import { useCallback, useState } from 'react'

export const CoverImage: FC = () => {
  const { state, dispatch } = useStoreContext()
  const [visible, setVisible] = useState(false)

  const field = state.selectedField!
  const isLayoutEnabled = isURL(field.layout?.mediaUrl)

  function handleOpen() {
    setVisible(true)
  }

  function handleClose() {
    setVisible(false)
  }

  function handleChange(value: string) {
    console.log('field.id', field.id)

    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          layout: {
            ...field.layout,
            mediaType: 'image',
            mediaUrl: value,
            brightness: field.layout?.brightness ?? 0,
            align: field.layout?.align || FieldLayoutAlignEnum.INLINE
          }
        }
      }
    })
  }

  function handleRemove() {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          layout: {}
        }
      }
    })
  }

  const handleChangeCallback = useCallback(handleChange, [field.layout])

  return (
    <>
      <div className="right-sidebar-group">
        <div className="flex items-center justify-between">
          <label className="form-item-label">Image</label>
          {isLayoutEnabled ? (
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

      <PhotoPicker visible={visible} onClose={handleClose} onChange={handleChangeCallback} />
    </>
  )
}
