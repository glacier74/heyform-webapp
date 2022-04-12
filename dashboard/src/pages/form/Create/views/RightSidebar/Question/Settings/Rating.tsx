import {
  RATING_SHAPE_CONFIG,
  RATING_SHAPE_OPTIONS,
  RATING_TOTAL_OPTIONS
} from '@/pages/form/Create/consts'
import { useStoreContext } from '@/pages/form/Create/store'
import { CheckIcon } from '@heroicons/react/solid'
import { Select } from '@heyforms/ui'
import type { FC } from 'react'
import { useCallback } from 'react'
import type { IBasicProps } from './Basic'

export const Rating: FC<IBasicProps> = ({ field }) => {
  const { dispatch } = useStoreContext()

  function valueRender(option: any) {
    if (!option) {
      return null
    }

    return (
      <>
        {RATING_SHAPE_CONFIG[option.value]}
        <span>{option.label}</span>
      </>
    )
  }

  function optionRender(option: any, isActive?: boolean) {
    return (
      <>
        {RATING_SHAPE_CONFIG[option.value]}
        <span className="select-option-text">{option.label}</span>
        {isActive && (
          <span className="select-option-checkmark">
            <CheckIcon />
          </span>
        )}
      </>
    )
  }

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

  function handleShape(shape: any) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          properties: {
            ...field.properties,
            shape
          }
        }
      }
    })
  }

  const handleTotalCallback = useCallback(handleTotal, [field.properties])
  const handleShapeCallback = useCallback(handleShape, [field.properties])

  return (
    <div className="right-sidebar-settings-item right-sidebar-rating">
      <div className="flex items-center">
        <Select
          className="w-20 mr-4"
          options={RATING_TOTAL_OPTIONS}
          value={field.properties?.total}
          onChange={handleTotalCallback}
        />
        <Select
          className="right-sidebar-custom-select flex-1"
          popupClassName="right-sidebar-custom-select-popup right-sidebar-rating-shape-popup"
          placement="bottom-end"
          options={RATING_SHAPE_OPTIONS}
          valueRender={valueRender as any}
          optionRender={optionRender}
          value={field.properties?.shape}
          onChange={handleShapeCallback}
        />
      </div>
    </div>
  )
}
