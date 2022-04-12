import { OPINION_SCALE_OPTIONS } from '@/pages/form/Create/consts'
import { useStoreContext } from '@/pages/form/Create/store'
import { Input, Select } from '@heyforms/ui'
import type { FC } from 'react'
import { startTransition, useCallback } from 'react'
import type { IBasicProps } from './Basic'

export const OpinionScale: FC<IBasicProps> = ({ field }) => {
  const { dispatch } = useStoreContext()

  function handleTotal(total: any) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          properties: {
            ...field.properties,
            total
          }
        }
      }
    })
  }

  function handleLeftLabel(leftLabel: any) {
    startTransition(() => {
      dispatch({
        type: 'updateField',
        payload: {
          id: field.id,
          updates: {
            properties: {
              ...field.properties,
              leftLabel
            }
          }
        }
      })
    })
  }

  function handleMiddleLabel(centerLabel: any) {
    startTransition(() => {
      dispatch({
        type: 'updateField',
        payload: {
          id: field.id,
          updates: {
            properties: {
              ...field.properties,
              centerLabel
            }
          }
        }
      })
    })
  }

  function handleRightLabel(rightLabel: any) {
    startTransition(() => {
      dispatch({
        type: 'updateField',
        payload: {
          id: field.id,
          updates: {
            properties: {
              ...field.properties,
              rightLabel
            }
          }
        }
      })
    })
  }

  const handleLeftLabelCallback = useCallback(handleLeftLabel, [field.properties])
  const handleMiddleLabelCallback = useCallback(handleMiddleLabel, [field.properties])
  const handleRightLabelCallback = useCallback(handleRightLabel, [field.properties])
  const handleTotalCallback = useCallback(handleTotal, [field.properties])

  return (
    <>
      <div className="right-sidebar-settings-item">
        <label className="form-item-label">Steps</label>
        <Select
          className="mt-1"
          value={field.properties?.total}
          options={OPINION_SCALE_OPTIONS}
          onChange={handleTotalCallback}
        />
      </div>
      <div className="right-sidebar-settings-item">
        <label className="form-item-label">Labels</label>
        <div className="pt-2">
          <Input
            placeholder="Left label"
            maxLength={24}
            value={field.properties?.leftLabel}
            onChange={handleLeftLabelCallback}
          />
          <Input
            className="mt-1.5"
            placeholder="Middle label"
            maxLength={24}
            value={field.properties?.centerLabel}
            onChange={handleMiddleLabelCallback}
          />
          <Input
            className="mt-1.5"
            placeholder="Right label"
            maxLength={24}
            value={field.properties?.rightLabel}
            onChange={handleRightLabelCallback}
          />
        </div>
      </div>
    </>
  )
}
