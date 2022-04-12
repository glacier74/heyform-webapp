import { NumberRange, SwitchField } from '@/components'
import { useStoreContext } from '@/pages/form/Create/store'
import type { FC } from 'react'
import { useCallback } from 'react'
import type { IBasicProps } from './Basic'

export const MultipleChoice: FC<IBasicProps> = ({ field }) => {
  const { dispatch } = useStoreContext()

  function handleAllowMultiple(allowMultiple: boolean) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          properties: {
            ...field.properties,
            allowMultiple
          }
        }
      }
    })
  }

  function handleRandomize(randomize: boolean) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          properties: {
            ...field.properties,
            randomize
          }
        }
      }
    })
  }

  function handleRange(range: any) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          validations: {
            ...field.validations,
            ...range
          }
        }
      }
    })
  }

  const handleAllowMultipleCallback = useCallback(handleAllowMultiple, [field.properties])
  const handleRandomizeCallback = useCallback(handleRandomize, [field.properties])
  const handleRangeCallback = useCallback(handleRange, [field.validations])

  return (
    <>
      <div className="right-sidebar-settings-item">
        <SwitchField
          label="Multiple selection"
          value={field.properties?.allowMultiple}
          onChange={handleAllowMultipleCallback}
        />
        {field.properties?.allowMultiple && (
          <NumberRange
            className="mt-2"
            min={0}
            max={field.properties?.choices?.length || 1}
            value={field.validations}
            onChange={handleRangeCallback}
          />
        )}
      </div>
      <div className="right-sidebar-settings-item">
        <SwitchField
          label="Randomize"
          value={field.properties?.randomize}
          onChange={handleRandomizeCallback}
        />
      </div>
    </>
  )
}
