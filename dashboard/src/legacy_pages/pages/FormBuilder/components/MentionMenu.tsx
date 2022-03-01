import { ComponentProps, OptionType } from '@heyui/component'
import { isValid } from '@hpnp/utils/helper'
import { CSSProperties, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import styled from 'styled-components'
import { useStoreState } from '../store'
import { useLockBodyScroll } from '../utils'
import { Portal } from './Portal'

interface MentionMenuProps extends ComponentProps {
  visible?: boolean
  keyword?: string
  portalStyle?: CSSProperties
  onClose: () => void
  onSelect: (item: OptionType) => void
}

export const MentionMenu = forwardRef<any, MentionMenuProps>(
  ({ visible, keyword, style, portalStyle, onClose, onSelect }, mentionMenuRef) => {
    const state = useStoreState()
    const [items, setItems] = useState<OptionType[]>([])
    const [highlight, setHighlight] = useState<string | undefined>()

    function handleClose() {
      setHighlight(undefined)
      onClose()
    }

    function handleSelect(kind?: string) {
      const item = items.find(row => row.id === kind)

      if (item) {
        onSelect(item)
      }

      handleClose()
    }

    function highlightNext() {
      let next = 0
      const index = items.findIndex(item => item.id === highlight)

      if (index > -1 && index + 1 <= items.length - 1) {
        next = index + 1
      }

      setHighlight(items[next].id)
    }

    function highlightPrevious() {
      let prev = items.length - 1
      const index = items.findIndex(item => item.id === highlight)

      if (index > -1 && index - 1 >= 0) {
        prev = index - 1
      }

      setHighlight(items[prev].id)
    }

    function selectHighlight() {
      handleSelect(highlight)
    }

    // Prevent scrolling when menu is open
    useLockBodyScroll(visible)

    // Filter items by keyword
    useEffect(() => {
      if (visible) {
        let items = state.references

        if (isValid(keyword)) {
          items = state.references.filter(item =>
            item.text.toLowerCase().includes(keyword!.toLowerCase())
          )

          // Select the first item
          if (items.length > 0) {
            setHighlight(items[0].id)
          }
        }

        setItems(items)
      }
    }, [state.references, keyword, visible])

    useImperativeHandle(mentionMenuRef, () => {
      return {
        highlightPrevious,
        highlightNext,
        selectHighlight
      }
    })

    return (
      <Portal visible={visible}>
        <Overlay onClick={handleClose} />
        <Container
          style={{
            ...style,
            ...portalStyle
          }}
        >
          {items.length > 0 ? (
            items.map(row => (
              <MenuItem
                key={row.id}
                highlight={row.id === highlight}
                onClick={() => handleSelect(row.id)}
              >
                {row.text}
              </MenuItem>
            ))
          ) : (
            <span>No questions found</span>
          )}
        </Container>
      </Portal>
    )
  }
)

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
`

const Container = styled.div`
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

const MenuItem = styled.div<{
  highlight?: boolean
}>`
  cursor: pointer;

  &:hover {
    background: #eee;
  }

  ${({ highlight }) => highlight && 'background: #ccc;'}
`
