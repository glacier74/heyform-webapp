import { ComponentProps, Flex, OptionType } from '@heyui/component'
import { isValid, isValidArray } from '@hpnp/utils/helper'
import {
  CSSProperties,
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState
} from 'react'
import styled from 'styled-components'
import { useLockBodyScroll, useStrictEqualState } from '../utils'
import { BLOCK_OPTIONS, BlockOption } from './BlockOptions'
import { Portal } from './Portal'

interface CommandMenuProps extends ComponentProps {
  visible?: boolean
  keyword?: string
  portalStyle?: CSSProperties
  onClose: () => void
  onSelect: (item: OptionType) => void
}

export const CommandMenu: FC<CommandMenuProps> = forwardRef<any, CommandMenuProps>(
  ({ visible, keyword, style, portalStyle, onClose, onSelect }, commandMenuRef) => {
    const [items, setItems] = useStrictEqualState<BlockOption[]>(BLOCK_OPTIONS)
    const [highlight, setHighlight] = useState<string | undefined>()
    const flatItems = useMemo(
      () => items.reduce<OptionType[]>((prev, row) => [...prev, ...row.children], []),
      [items]
    )

    function handleClose() {
      setHighlight(undefined)
      onClose()
    }

    function handleSelect(fieldId?: string) {
      const item = flatItems.find(row => row.id === fieldId)

      if (item) {
        onSelect(item)
      }

      handleClose()
    }

    function highlightNext() {
      let next = 0
      const index = flatItems.findIndex(item => item.id === highlight)

      if (index > -1 && index + 1 <= flatItems.length - 1) {
        next = index + 1
      }

      setHighlight(flatItems[next].id)
    }

    function highlightPrevious() {
      let prev = flatItems.length - 1
      const index = flatItems.findIndex(item => item.id === highlight)

      if (index > -1 && index - 1 >= 0) {
        prev = index - 1
      }

      setHighlight(flatItems[prev].id)
    }

    function selectHighlight() {
      handleSelect(highlight)
    }

    // Prevent scrolling when menu is open
    useLockBodyScroll(visible)

    // Filter items by keyword
    useEffect(() => {
      if (visible) {
        let items: BlockOption[] = BLOCK_OPTIONS

        if (isValid(keyword)) {
          // @ts-ignore
          items = BLOCK_OPTIONS.map(item => {
            const children = item.children.filter(row => {
              return row.text.toLowerCase().includes(keyword!.toLowerCase())
            })

            if (isValidArray(children)) {
              return {
                name: item.name,
                children
              }
            }
          }).filter(Boolean)

          // Select the first item
          if (items.length > 0) {
            setHighlight(items[0].children[0].id)
          }
        }

        setItems(items)
      }
    }, [keyword, visible])

    // @ts-ignore
    useImperativeHandle(commandMenuRef, () => {
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
            items.map(item => (
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
            ))
          ) : (
            <span>No search results</span>
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
