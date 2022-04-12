import { LAYOUT_OPTIONS } from '@/pages/form/Create/consts'
import { useStoreContext } from '@/pages/form/Create/store'
import { FieldLayoutAlignEnum } from '@heyforms/shared-types-enums'
import { Input, Slider } from '@heyforms/ui'
import { isURL } from '@hpnp/utils/helper'
import clsx from 'clsx'
import type { FC } from 'react'
import { startTransition, useCallback } from 'react'

interface LayoutSwitchProps {
  value?: string
  onChange: (value: string) => void
}

interface LayoutSwitchItemProps {
  item: {
    value: string
    icon: any
  }
  isActive?: boolean
  onClick: (value: string) => void
}

const LayoutSwitchItem: FC<LayoutSwitchItemProps> = ({ item, isActive, onClick }) => {
  function handleClick() {
    onClick(item.value)
  }

  return (
    <div
      className={clsx('right-sidebar-layout-item', {
        'right-sidebar-layout-item-active': isActive
      })}
      onClick={handleClick}
    >
      <div className="right-sidebar-layout-container">{item.icon}</div>
    </div>
  )
}

const LayoutSwitch: FC<LayoutSwitchProps> = ({ value, onChange }) => {
  return (
    <div className="right-sidebar-layout-switch">
      {LAYOUT_OPTIONS.map(row => (
        <LayoutSwitchItem
          key={row.value}
          item={row}
          isActive={row.value === value}
          onClick={onChange}
        />
      ))}
    </div>
  )
}

export const Layout: FC = () => {
  const { state, dispatch } = useStoreContext()
  const field = state.selectedField!

  function handleChange(align: any) {
    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          layout: {
            ...field.layout,
            align
          }
        }
      }
    })
  }

  function handleBrightness(brightness: any) {
    startTransition(() => {
      dispatch({
        type: 'updateField',
        payload: {
          id: field.id,
          updates: {
            layout: {
              ...field.layout,
              brightness
            }
          }
        }
      })
    })
  }

  const handleChangeCallback = useCallback(handleChange, [field.layout])
  const handleBrightnessCallback = useCallback(handleBrightness, [field.layout])

  if (!isURL(field.layout?.mediaUrl)) {
    return null
  }

  return (
    <>
      <div className="right-sidebar-group">
        <label className="form-item-label">Layout</label>
        <div className="mt-1">
          <LayoutSwitch value={field.layout?.align} onChange={handleChangeCallback} />
        </div>
      </div>

      {field.layout?.align !== FieldLayoutAlignEnum.INLINE && (
        <div className="right-sidebar-group">
          <label className="form-item-label">Brightness</label>
          <div className="flex items-center mt-1">
            <Slider
              min={-100}
              max={100}
              value={field.layout?.brightness}
              onChange={handleBrightnessCallback}
            />
            <Input
              className="ml-4 w-24"
              type="number"
              value={field.layout?.brightness}
              min={-100}
              max={100}
              onChange={handleBrightnessCallback}
            />
          </div>
        </div>
      )}
    </>
  )
}
