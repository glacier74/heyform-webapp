import { FieldKindEnum, FormField } from '@heyforms/shared-types-enums'
import { ComponentProps, Flex, OptionType } from '@heyui/component'
import { isEmpty } from '@hpnp/utils/helper'
import { CSSProperties, FC, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { useStoreContext } from '../store'
import { getFieldFromKind, getStyleFromRect, useLockBodyScroll } from '../utils'
import { BLOCK_OPTIONS } from './BlockOptions'
import { AddIcon } from './Icons'
import { Portal } from './Portal'

interface BlockMenuProps extends ComponentProps {
  field: FormField
}

export const InsertBlockMenu: FC<BlockMenuProps> = ({ field, ...restProps }) => {
  const ref = useRef<any>()
  const { state, dispatch } = useStoreContext()

  const [highlight, setHighlight] = useState<string | undefined>()
  const [visible, setVisible] = useState(false)
  const [portalStyle, setPortalStyle] = useState<CSSProperties>()

  const flatItems = useMemo(
    () => BLOCK_OPTIONS.reduce<OptionType[]>((prev, row) => [...prev, ...row.children], []),
    []
  )

  function handleClose() {
    setHighlight(undefined)
    setVisible(false)
  }

  function handleSelect(id?: string) {
    const item = flatItems.find(row => row.id === id)

    if (item) {
      const kind: FieldKindEnum = item.id

      if (kind === FieldKindEnum.WELCOME) {
        if (isEmpty(state.welcome)) {
          dispatch({
            type: 'setWelcome',
            payload: {
              data: {
                title: '',
                body: ''
              }
            }
          })
        }

        setTimeout(() => {
          document.getElementById('block-welcome')?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          })
        }, 0)
      } else if (kind === FieldKindEnum.THANK_YOU) {
        if (isEmpty(state.thankYou)) {
          dispatch({
            type: 'setThankYou',
            payload: {
              data: {
                title: '',
                body: ''
              }
            }
          })
        }

        setTimeout(() => {
          document.getElementById('block-thankyou')?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          })
        }, 0)
      } else {
        dispatch({
          type: 'addField',
          payload: {
            field: getFieldFromKind(kind),
            afterId: field.id
          }
        })
      }
    }

    handleClose()
  }

  function handleClick() {
    const rect = ref.current!.getBoundingClientRect()

    setVisible(true)
    setPortalStyle(getStyleFromRect(rect))
  }

  // Prevent scrolling when menu is open
  useLockBodyScroll(visible)

  return (
    <>
      <Container ref={ref} onClick={handleClick} {...restProps}>
        <AddIcon />
      </Container>
      <Portal visible={visible}>
        <Overlay onClick={handleClose} />
        <MenuContainer style={portalStyle}>
          {BLOCK_OPTIONS.map(item => (
            <MenuList key={item.name}>
              <MenuLabel align="center">{item.name}</MenuLabel>
              {item.children.map(row => (
                <MenuItem
                  key={row.id}
                  highlight={row.id === highlight}
                  onClick={() => handleSelect(row.id)}
                >
                  {row.icon}
                  <span>{row.text}</span>
                </MenuItem>
              ))}
            </MenuList>
          ))}
        </MenuContainer>
      </Portal>
    </>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 3px;
  cursor: pointer;
  color: #999;

  &:hover {
    color: #666;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
`

const MenuContainer = styled.div`
  position: fixed;
  width: 320px;
  height: inherit;
  background: #fff;
  border-radius: 5px;
  box-shadow: rgba(60, 66, 87, 0.05) 0px 0px 0px 1px, rgba(60, 66, 87, 0.1) 0px 3px 6px,
    rgba(60, 66, 87, 0.2) 0px 9px 24px;
  overflow-y: auto;
  z-index: 10000;
`

const MenuList = styled.div`
  padding-bottom: 10px;
`

const MenuLabel = styled(Flex)`
  padding: 0 14px;
  height: 32px;
  font-size: 11px;
  font-weight: bold;
  line-height: 1.5;
  text-transform: uppercase;
  color: rgba(136, 136, 136, 0.8);
`

const MenuItem = styled.div<{
  highlight?: boolean
}>`
  display: flex;
  align-items: center;
  padding: 0 14px;
  height: 32px;
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
  }

  span {
    margin-left: 8px;
  }

  &:hover {
    background: #eee;
  }

  ${({ highlight }) =>
    highlight &&
    `
  background: #eee;
  `}
`
