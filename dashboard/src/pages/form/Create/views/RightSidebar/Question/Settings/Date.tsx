import { DATE_FORMAT_OPTIONS } from '@/pages/form/Create/consts'
import { useStoreContext } from '@/pages/form/Create/store'
import { Select } from '@heyforms/ui'
import type { FC } from 'react'
import { useCallback } from 'react'
import type { IBasicProps } from './Basic'

export const Date: FC<IBasicProps> = ({ field }) => {
  const { dispatch } = useStoreContext()

  function handleChange(format: any) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          properties: {
            ...field.properties,
            format
          }
        }
      }
    })
  }

  const handleChangeCallback = useCallback(handleChange, [field.properties])

  return (
    <div className="right-sidebar-settings-item">
      <label className="form-item-label">Date format</label>
      <Select
        className="mt-1"
        options={DATE_FORMAT_OPTIONS}
        value={field.properties?.format}
        onChange={handleChangeCallback}
      />
    </div>
  )
}
