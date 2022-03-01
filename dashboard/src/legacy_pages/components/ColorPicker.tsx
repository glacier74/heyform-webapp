import { stopPropagation } from '@/legacy_pages/utils'
import { ComponentProps, Flex, InputStyle } from '@heyui/component'
import { isValid } from '@hpnp/utils/helper'
import { FC } from 'react'
import { ColorResult } from 'react-color'
import { EditableInput, Hue, Saturation } from 'react-color/lib/components/common'
import ColorWrap from 'react-color/lib/components/common/ColorWrap'
import styled from 'styled-components'

interface WrapperProps extends ComponentProps {
  color?: string
  presets?: string[]
  hsl?: any
  hsv?: any
  hex?: string
  onChange?: (color: ColorResult) => void
}

export interface ColorPickerProps extends ComponentProps {
  value?: string
  presets?: string[]
  onChange?: (value: string) => void
  onClose?: () => void
}

const Wrapper: FC<WrapperProps> = ({ className, style, hsl, hsv, hex, presets = [], onChange }) => {
  return (
    <Container className={className} style={style} onClick={stopPropagation}>
      <SaturationContainer>
        <Saturation
          // @ts-ignore
          hsl={hsl}
          hsv={hsv}
          pointer={SaturationPointer}
          // @ts-ignore
          onChange={onChange}
        />
      </SaturationContainer>
      <HueContainer>
        <Hue
          // @ts-ignore
          hsl={hsl}
          hsv={hsv}
          pointer={HuePointer}
          /* @ts-ignore */
          onChange={onChange}
        />
      </HueContainer>
      <EditableInputContainer>
        <ColorPreview
          style={{
            background: hex
          }}
        />
        <ColorInput>
          <EditableInput value={hex} onChange={onChange} />
        </ColorInput>
      </EditableInputContainer>
      <Presets wrap="wrap">
        {presets.map((hex, index) => (
          <PresetButton
            key={index}
            style={{ background: hex }}
            onClick={() => onChange && onChange({ hex } as any)}
          />
        ))}
      </Presets>
    </Container>
  )
}

const ColorPickerWrap = ColorWrap<any>(Wrapper as any)

export const ColorPicker: FC<ColorPickerProps> = ({
  className,
  style,
  value,
  presets,
  onChange
}) => {
  function handleChange(color: ColorResult) {
    onChange && onChange(color.hex)
  }

  return (
    <ColorPickerWrap
      className={className}
      style={style}
      color={isValid(value) ? value : '#37352f'}
      presets={presets}
      onChange={handleChange}
    />
  )
}

const Container = styled.div`
  width: 290px;
`

const SaturationPointer = styled.div`
  width: 12px;
  height: 12px;
  box-shadow: rgb(255, 255, 255) 0 0 0 3px, rgba(0, 0, 0, 0.3) 0 0 1px 1px inset,
    rgba(0, 0, 0, 0.4) 0 0 1px 2px;
  border-radius: 50%;
  transform: translate(-6px, -6px);
  cursor: move;
`

const SaturationContainer = styled.div`
  position: relative;
  height: 128px;
`

const HueContainer = styled.div`
  position: relative;
  margin-top: 8px;
  height: 12px;

  .hue-horizontal {
    border-radius: 4px;
  }
`

const HuePointer = styled.div`
  width: 8px;
  height: 16px;
  transform: translate(-4px, -2px);
  background-color: ${props => props.theme.white};
  border: 1px solid ${props => props.theme.border};
  cursor: move;
`

const EditableInputContainer = styled(Flex)`
  margin-top: 8px;
  border-radius: ${props => props.theme.borderRadius};
  overflow: hidden;
`

const PresetButton = styled.div`
  width: 20px;
  height: 20px;
  margin: 2px;
  border-radius: ${props => props.theme.borderRadius};
  cursor: pointer;
`

const ColorPreview = styled(PresetButton)`
  width: 32px;
  height: 32px;
  margin: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: rgba(0, 0, 0, 0.2) 0 0 0 1px inset;
  cursor: default;
`

const ColorInput = styled.div`
  flex: 1;

  & > div,
  input {
    width: 100%;
  }

  input {
    ${InputStyle};
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: none;
    padding: 4px 12px;

    &:hover,
    &:focus {
      border-color: ${props => props.theme.border};
    }
  }
`

const Presets = styled(Flex)`
  margin-top: 12px;
`
