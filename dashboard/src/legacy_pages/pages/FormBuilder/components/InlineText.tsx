import { KeyCodeEnum } from '@heyforms/shared-types-enums'
import { ComponentProps } from '@heyui/component'
import { alpha } from '@hpnp/utils/color'
import { isEmpty, isValid } from '@hpnp/utils/helper'
import clsx from 'clsx'
import throttle from 'lodash/throttle'
import { FC, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { insertClipboardText } from '../utils'
import { RichTextState } from './RichText'

export interface InlineTextProps extends ComponentProps {
  index?: number
  placeholder?: string
  value?: string
  onFocus?: (index?: number) => void
  onUp?: (index?: number) => void
  onDown?: (index?: number) => void
  onEnter?: (value: string, index?: number) => void
  onDelete?: (index?: number) => void
  onChange?: (value: string, index?: number) => void
}

const InlineTextComponent: FC<InlineTextProps> = ({
  className,
  style,
  index,
  placeholder,
  value: rawValue,
  onFocus,
  onUp,
  onDown,
  onEnter,
  onDelete,
  onChange
}) => {
  const throttledUpdate = throttle(updateField, 200)
  const ref = useRef<any>()

  const localState = useRef<RichTextState>({
    isCompositing: false,
    isCanDelete: false
  })

  function handleKeyDown(event: any) {
    if (localState.current.isCompositing) {
      return
    }

    // Add a flag to tell if this block can be deleted or not
    localState.current.isCanDelete = isEmpty(ref.current!.innerText)

    switch (event.which) {
      case KeyCodeEnum.UP:
        onUp && onUp(index)
        break

      case KeyCodeEnum.DOWN:
        onDown && onDown(index)
        break

      case KeyCodeEnum.ENTER:
        onEnter && onEnter(ref.current!.innerText, index)
        event.preventDefault()
        break

      case KeyCodeEnum.BACKSPACE:
        if (localState.current.isCanDelete) {
          onDelete && onDelete(index)
          event.preventDefault()
        }
        break

      case KeyCodeEnum.ESC:
        event.preventDefault()
        break
    }
  }

  function handleInput() {
    if (localState.current.isCompositing) {
      return
    }

    throttledUpdate()
  }

  function handlePaste(event: any) {
    event.preventDefault()
    insertClipboardText(event)
  }

  function handleComposition(event: any) {
    switch (event.type) {
      case 'compositionstart':
        localState.current.isCompositing = true
        break

      case 'compositionend':
        localState.current.isCompositing = false
        throttledUpdate()
        break
    }
  }

  function handleFocus() {
    onFocus && onFocus(index)
  }

  function updateField() {
    onChange && onChange(ref.current!.innerText, index)
  }

  useEffect(() => {
    if (ref.current && isValid(rawValue)) {
      ref.current.innerText = rawValue!
    }
  }, [ref])

  return (
    <Container
      ref={ref}
      className={clsx('block-inline-text', className)}
      placeholder={placeholder}
      contentEditable={true}
      onCompositionStart={handleComposition}
      onCompositionEnd={handleComposition}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      onPaste={handlePaste}
      onFocus={handleFocus}
      suppressContentEditableWarning={true}
      tabIndex={0}
      style={style}
    />
  )
}
export const InlineText = InlineTextComponent

const Container = styled.div`
  font-weight: 500;
  color: ${props => props.theme.answer};
  font-size: ${props => props.theme.answerFontSize};
  line-height: 1.1875;
  outline: none;

  &:empty:before {
    position: absolute;
    pointer-events: none;
    content: attr(placeholder);
    color: ${props => alpha(props.theme.answer, 0.3)};
  }
`
