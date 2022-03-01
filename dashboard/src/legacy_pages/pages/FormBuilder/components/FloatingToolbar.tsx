import { Button, ComponentProps, Form, FormItem, Input } from '@heyui/component'
import { isValid } from '@hpnp/utils/helper'
import { CSSProperties, FC, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { getStyleFromRect, useOnClickOutside } from '../utils'
import { BoldIcon, ItalicIcon, LinkIcon, UnderlineIcon, UnlinkIcon } from './Icons'
import { Portal } from './Portal'

interface FloatingToolbarProps extends ComponentProps {
  visible?: boolean
  range?: Range
  onChange: () => void
  onClose: () => void
}

export const FloatingToolbar: FC<FloatingToolbarProps> = ({
  visible,
  range,
  onChange,
  onClose,
  ...restProps
}) => {
  const [portalStyle, setPortalStyle] = useState<CSSProperties>()
  const linkButtonRef = useRef<any>()
  const linkRef = useRef<any>()
  const [linkVisible, setLinkVisible] = useState(false)
  const [linkStyle, setLinkStyle] = useState<CSSProperties>()

  function handleBold() {
    document.execCommand('bold')
    onChange()
  }

  function handleItalic() {
    document.execCommand('italic')
    onChange()
  }

  function handleUnderline() {
    document.execCommand('underline')
    onChange()
  }

  function handleLinkOpen() {
    const linkStyle = getStyleFromRect(linkButtonRef.current.getBoundingClientRect())
    setLinkStyle(linkStyle)
    setLinkVisible(true)
  }

  function handleLink({ url }: any) {
    const sel = handleSelectRange()
    const node = document.createElement('a')

    node.setAttribute('href', url)
    node.setAttribute('target', '_blank')
    node.innerText = sel!.toString()

    range!.deleteContents()
    range!.insertNode(node)

    setLinkVisible(false)
    onChange()
  }

  function handleUnlink() {
    document.execCommand('unlink')
    onChange()
  }

  function handleSelectRange() {
    const sel = window.getSelection()
    sel!.removeAllRanges()
    sel!.addRange(range!)

    return sel
  }

  useOnClickOutside(linkRef!, () => {
    handleSelectRange()
    setLinkVisible(false)
  })

  useEffect(() => {
    if (isValid(range) && range instanceof Range) {
      setPortalStyle(getStyleFromRect(range!.getBoundingClientRect()))
    }
  }, [range])

  return (
    <Portal visible={visible}>
      <Overlay onClick={onClose} />
      <Container style={portalStyle} {...restProps}>
        <StyledButton title="Bold" icon={<BoldIcon />} onClick={handleBold} />
        <StyledButton title="Italic" icon={<ItalicIcon />} onClick={handleItalic} />
        <StyledButton title="Underline" icon={<UnderlineIcon />} onClick={handleUnderline} />
        <StyledButton
          innerRef={linkButtonRef}
          title="Link"
          icon={<LinkIcon />}
          onClick={handleLinkOpen}
        />
        <StyledButton title="Unlink" icon={<UnlinkIcon />} onClick={handleUnlink} />
      </Container>

      {linkVisible && (
        <>
          <Container ref={linkRef} style={linkStyle}>
            <Form onFinish={handleLink}>
              <FormItem name="url" rules={[{ type: 'url', required: true }]}>
                <Input placeholder="Enter link here" />
              </FormItem>
              <FormItem>
                <SubmitButton type="primary" htmlType="submit">
                  Continue
                </SubmitButton>
              </FormItem>
            </Form>
          </Container>
        </>
      )}
    </Portal>
  )
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  padding: 5px;
  height: inherit;
  background: #fff;
  border-radius: 5px;
  box-shadow: rgba(60, 66, 87, 0.05) 0px 0px 0px 1px, rgba(60, 66, 87, 0.1) 0px 3px 6px,
    rgba(60, 66, 87, 0.2) 0px 9px 24px;
  overflow-y: auto;
  z-index: 10000;
`

const StyledButton = styled(Button)`
  padding: 8px;
  border: none;
  background: transparent;
  border-radius: 4px;

  svg {
    margin-right: 0;
  }

  &:hover {
    background: #f1f1f1;
  }
`

const SubmitButton = styled(Button)`
  border: none;
  background: #111827;
  color: #fff;
`
