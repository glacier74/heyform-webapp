import { Dropdown, Flex } from '@heyui/component'
// @ts-ignore
import { COLOR_PALETTE } from '@heyui/component/esm/constants'
import { ArrowDownSIcon } from '@heyui/icon'
import { FC, useState } from 'react'
import styled from 'styled-components'
import { ColorPicker, ColorPickerProps } from './ColorPicker'

export const ColorDropPicker: FC<ColorPickerProps> = ({
  className,
  style,
  value,
  presets = COLOR_PALETTE,
  onChange,
  onClose
}) => {
  const [tmpColor] = useState(value)

  function handleChange(color: string) {
    onChange && onChange(color)
  }

  function handleVisibleChange(visible: boolean) {
    if (!visible && tmpColor !== value) {
      onClose && onClose()
    }
  }

  return (
    <Dropdown
      placement="right-start"
      offset={{
        left: 12
      }}
      overlay={<StyledColorPicker value={value} presets={presets} onChange={handleChange} />}
      onDropdownVisibleChange={handleVisibleChange}
    >
      <Container className={className} style={style} align="center" justify="space-between">
        <ColorValue style={{ background: value }} />
        <Arrow>
          <ArrowDownSIcon />
        </Arrow>
      </Container>
    </Dropdown>
  )
}

const Container = styled(Flex)`
  min-width: 80px;
  height: 32px;
  padding: 0 12px;
  background: #f3f3f3;
  color: #4e5d78;
  border: none;
  cursor: pointer;
  transition: all 150ms;
`

const ColorValue = styled.div`
  position: relative;

  &,
  &:after {
    width: 16px;
    height: 16px;
    border-radius: 3px;
  }

  &:after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    border: 1px solid rgba(0, 0, 0, 0.08);
  }
`

const Arrow = styled.span`
  display: flex;
  align-items: center;
  color: #8a94a6;

  svg {
    width: 20px;
    height: 20px;
    margin-right: -5px;
  }
`

const StyledColorPicker = styled(ColorPicker)`
  padding: 12px;
  background: #fff;
  box-shadow: 0 3px 12px 2px rgb(55 60 67 / 12%);
  font-size: ${({ theme }) => theme.fontSize};
  color: ${({ theme }) => theme.text};
  overflow: hidden auto;
`
