import { ChevronDownIcon } from '@heroicons/react/outline'
import { Button, Dropdown, Menus, stopPropagation } from '@heyforms/ui'
import type { FC } from 'react'
import { startTransition } from 'react'
import type { ColorResult } from 'react-color'
import { EditableInput, Hue, Saturation } from 'react-color/lib/components/common'
import ColorWrap from 'react-color/lib/components/common/ColorWrap'

interface WrapperProps {
  color?: string
  presets?: string[]
  hsl?: any
  hsv?: any
  hex?: string
  onChange?: (color: ColorResult) => void
}

interface ColorPickerProps {
  color?: string
  onChange?: (color: string) => void
}

interface ColorPickerFieldProps {
  label: string
  value?: string
  onChange?: (value: string) => void
}

const SaturationPointer = () => <div className="color-picker-saturation-pointer" />
const HuePointer = () => <div className="color-picker-hue-pointer" />

const Wrapper: FC<WrapperProps> = ({ hsl, hsv, hex, presets = [], onChange }) => {
  return (
    <div className="color-picker-popup" onClick={stopPropagation}>
      <div className="color-picker-saturation">
        <Saturation
          hsl={hsl}
          hsv={hsv}
          pointer={SaturationPointer as any}
          onChange={onChange as any}
        />
      </div>
      <div className="color-picker-hue">
        <Hue hsl={hsl} hsv={hsv} pointer={HuePointer as any} onChange={onChange as any} />
      </div>
      <div className="color-picker-editable">
        <div
          className="color-picker-preview"
          style={{
            background: hex
          }}
        />
        <div className="color-picker-editable-input">
          <EditableInput value={hex} onChange={onChange} />
        </div>
      </div>
    </div>
  )
}
const ColorWrapper = ColorWrap(Wrapper as any)

const ColorPicker: FC<ColorPickerProps> = ({ color, onChange }) => {
  function handleChange({ hex }: ColorResult) {
    startTransition(() => {
      onChange?.(hex)
    })
  }

  const Overlay = (
    <Menus>
      <ColorWrapper color={color} onChange={handleChange} />
    </Menus>
  )

  return (
    <Dropdown overlay={Overlay}>
      <Button className="color-picker" trailing={<ChevronDownIcon />}>
        <div className="color-picker-value" style={{ backgroundColor: color }}></div>
      </Button>
    </Dropdown>
  )
}

export const ColorPickerField: FC<ColorPickerFieldProps> = ({ label, value, onChange }) => {
  return (
    <div className="right-sidebar-settings-item">
      <div className="flex items-center justify-between">
        <label className="form-item-label">{label}</label>
        <ColorPicker color={value} onChange={onChange} />
      </div>
    </div>
  )
}
