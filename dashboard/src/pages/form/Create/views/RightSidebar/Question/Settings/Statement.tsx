import { useStoreContext } from '@/pages/form/Create/store'
import { Input } from '@heyforms/ui'
import type { FC } from 'react'
import { startTransition, useCallback } from 'react'
import type { IBasicProps } from './Basic'

export const Statement: FC<IBasicProps> = ({ field }) => {
  const { dispatch } = useStoreContext()

  function handleChange(buttonText: any) {
    startTransition(() => {
      dispatch({
        type: 'updateField',
        payload: {
          id: field.id,
          updates: {
            properties: {
              ...field.properties,
              buttonText
            }
          }
        }
      })
    })
  }

  const handleChangeCallback = useCallback(handleChange, [field.properties])

  return (
    <div className="right-sidebar-settings-item">
      <label className="form-item-label">Button Text</label>
      <Input
        className="mt-1"
        value={field.properties?.buttonText}
        maxLength={24}
        onChange={handleChangeCallback}
      />
    </div>
  )
}
