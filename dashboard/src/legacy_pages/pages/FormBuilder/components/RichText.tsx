import { FieldKindEnum, KeyCodeEnum } from '@heyforms/shared-types-enums'
import { ComponentProps, OptionType } from '@heyui/component'
import { isEmpty, isValid } from '@hpnp/utils/helper'
import clsx from 'clsx'
import throttle from 'lodash/throttle'
import { CSSProperties, FC, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {
  getRichTextSelection,
  getStyleFromRect,
  getTextPrecedingAtTrigger,
  insertClipboardText,
  replaceTriggerText,
  RichTextSelection
} from '../utils'
import { CommandMenu } from './CommandMenu'
import { FloatingToolbar } from './FloatingToolbar'
import { MentionMenu } from './MentionMenu'

export interface RichTextProps extends ComponentProps {
  innerRef: any
  value?: string
  placeholder?: string
  enableMention?: boolean
  enableCommand?: boolean
  enableTextFormat?: boolean
  enableMultiLine?: boolean
  onFocus?: () => void
  onUp?: () => void
  onDown?: () => void
  onEnter?: () => void
  onDelete?: () => void
  onCommandSelect?: (kind: FieldKindEnum) => void
  onChange?: (value: string) => void
}

export interface RichTextState {
  key?: string
  isCompositing: boolean
  isCanDelete: boolean
  isMentionOpen?: boolean
  isCommandOpen?: boolean
  isToolbarOpen?: boolean
  selection?: RichTextSelection
}

const MENTION_TRIGGER = '@'
const COMMAND_TRIGGER = '/'

const RichTextComponent: FC<RichTextProps> = ({
  className,
  style,
  innerRef,
  value,
  placeholder,
  enableMention = true,
  enableCommand = true,
  enableTextFormat = true,
  enableMultiLine = false,
  onFocus,
  onUp,
  onDown,
  onEnter,
  onDelete,
  onCommandSelect,
  onChange
}) => {
  const mentionMenuRef = useRef<any>()
  const commandMenuRef = useRef<any>()
  const keywordRef = useRef<any>()

  const [isMentionOpen, setIsMentionOpen] = useState(false)
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const [isToolbarOpen, setIsToolbarOpen] = useState(false)
  const [portalStyle, setPortalStyle] = useState<CSSProperties | undefined>()
  const [toolbarRange, setToolbarRange] = useState<Range | undefined>()

  const handleCompositionCallback = useCallback(handleComposition, [])
  const handleKeyDownCallback = useCallback(handleKeyDown, [])
  const handleKeyUpCallback = useCallback(handleKeyUp, [])
  const handleInputCallback = useCallback(handleInput, [])
  const handlePasteCallback = useCallback(handlePaste, [])
  const handleMouseUpCallback = useCallback(handleMouseUp, [])
  const hideMentionMenuCallback = useCallback(hideMentionMenu, [])
  const handleMentionSelectCallback = useCallback(handleMentionSelect, [])
  const hideCommandMenuCallback = useCallback(hideCommandMenu, [])
  const handleCommandSelectCallback = useCallback(handleCommandSelect, [])
  const hideToolbarCallback = useCallback(hideToolbar, [])
  const throttledUpdate = useCallback(throttle(handleUpdate, 200), [])

  const localState = useRef<RichTextState>({
    isCompositing: false,
    isCanDelete: false,
    isMentionOpen: false,
    isCommandOpen: false,
    isToolbarOpen: false
  })

  function handleMentionSelect(item: OptionType) {
    const sel = localState.current.selection!
    const selection: RichTextSelection = {
      anchorNode: sel.anchorNode,
      startOffset: sel.startOffset! - 1,
      endOffset: sel.startOffset! + (keywordRef.current?.length || 0)
    }
    const template = `<span class="mention" data-mention="${item.id}" contenteditable="false">@${item.text}</span>\xA0`

    replaceTriggerText(innerRef.current!, selection, template)
    throttledUpdate()

    hideMentionMenu()
  }

  function handleCommandSelect(item: OptionType) {
    hideCommandMenu()
    onCommandSelect && onCommandSelect(item.id as FieldKindEnum)
  }

  function handleKeyDown(event: any) {
    if (localState.current.isCompositing) {
      return
    }

    // Save pressed key
    localState.current.key = event.key

    // Add a flag to tell if this block can be deleted or not
    localState.current.isCanDelete = isEmpty(innerRef.current!.innerText)

    const { isMentionOpen, isCommandOpen, isToolbarOpen } = localState.current

    switch (event.which) {
      case KeyCodeEnum.UP:
        if (isMentionOpen || isCommandOpen || isToolbarOpen) {
          isMentionOpen && mentionMenuRef.current.highlightPrevious()
          isCommandOpen && commandMenuRef.current.highlightPrevious()
          event.preventDefault()
        } else {
          onUp && onUp()
        }
        break

      case KeyCodeEnum.DOWN:
        if (isMentionOpen || isCommandOpen || isToolbarOpen) {
          isMentionOpen && mentionMenuRef.current.highlightNext()
          isCommandOpen && commandMenuRef.current.highlightNext()
          event.preventDefault()
        } else {
          onDown && onDown()
        }
        break

      case KeyCodeEnum.ENTER:
        if (isMentionOpen || isCommandOpen || isToolbarOpen) {
          isMentionOpen && mentionMenuRef.current.selectHighlight()
          isCommandOpen && commandMenuRef.current.selectHighlight()
          event.preventDefault()
        } else if (!enableMultiLine) {
          onEnter && onEnter()
          event.preventDefault()
        }
        break

      case KeyCodeEnum.BACKSPACE:
        if (!isMentionOpen && !isCommandOpen && !isToolbarOpen && localState.current.isCanDelete) {
          onDelete && onDelete()
          event.preventDefault()
        }
        break

      case KeyCodeEnum.ESC:
        if (isMentionOpen || isCommandOpen || isToolbarOpen) {
          isMentionOpen && hideMentionMenu()
          isCommandOpen && hideCommandMenu()
          event.preventDefault()
        }
        break
    }
  }

  function handleKeyUp() {
    if (localState.current.isCompositing) {
      return
    }

    const { isMentionOpen, isCommandOpen, isToolbarOpen } = localState.current

    if (!(isMentionOpen || isCommandOpen || isToolbarOpen)) {
      const key = localState.current.key

      if (
        (enableMention && key === MENTION_TRIGGER) ||
        (enableCommand && key === COMMAND_TRIGGER)
      ) {
        const selection = getRichTextSelection()

        setPortalStyle(getStyleFromRect(selection!.rect!))
        localState.current.selection = selection!

        if (key === MENTION_TRIGGER) {
          setIsMentionOpen(true)
          localState.current.isMentionOpen = true
        } else {
          setIsCommandOpen(true)
          localState.current.isCommandOpen = true
        }
      }

      handleMouseUp()
    }
  }

  function handleInput() {
    if (localState.current.isCompositing) {
      return
    }

    const { isMentionOpen, isCommandOpen, isToolbarOpen } = localState.current

    if (isMentionOpen || isCommandOpen) {
      const trigger = isMentionOpen ? MENTION_TRIGGER : COMMAND_TRIGGER
      const { startOffset } = localState.current.selection!
      const preceding = getTextPrecedingAtTrigger(trigger, startOffset)

      if (preceding.isTriggering) {
        keywordRef.current = preceding.text
      } else {
        if (isMentionOpen) {
          hideMentionMenu()
        } else {
          hideCommandMenu()
        }
      }
    } else if (isToolbarOpen) {
      if (isEmpty(innerRef.current!.innerHTML)) {
        hideToolbar()
      }
    }

    throttledUpdate()
  }

  function handleMouseUp() {
    if (!enableTextFormat) {
      return
    }

    const sel = window.getSelection()

    if (sel) {
      const text = sel.toString()

      if (isValid(text)) {
        // Don't change cart if FloatingToolbar is open
        // @ts-ignore
        innerRef.current.isToolbarOpen = true

        setToolbarRange(sel!.getRangeAt(0).cloneRange())
        setIsToolbarOpen(true)
        localState.current.isToolbarOpen = true
      }
    }
  }

  function hideMentionMenu() {
    setIsMentionOpen(false)
    localState.current.isMentionOpen = false
    keywordRef.current = undefined
  }

  function hideCommandMenu() {
    setIsCommandOpen(false)
    localState.current.isCommandOpen = false
    keywordRef.current = undefined
  }

  function hideToolbar() {
    setIsToolbarOpen(false)
    localState.current.isToolbarOpen = false
    setToolbarRange(undefined)

    // Don't change cart if FloatingToolbar is open
    // @ts-ignore
    innerRef.current.isToolbarOpen = false
  }

  function handlePaste(event: any) {
    event.preventDefault()

    if (!isToolbarOpen) {
      insertClipboardText(event)
      throttledUpdate()
    }
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

  function handleUpdate() {
    onChange && onChange(innerRef.current!.innerHTML)
  }

  // Setup initial html
  useEffect(() => {
    if (innerRef.current && isValid(value)) {
      innerRef.current.innerHTML = value
    }
  }, [innerRef])

  return (
    <>
      <Container
        ref={innerRef}
        className={clsx('block-rich-text', className)}
        placeholder={placeholder}
        contentEditable={true}
        onCompositionStart={handleCompositionCallback}
        onCompositionEnd={handleCompositionCallback}
        onKeyDown={handleKeyDownCallback}
        onKeyUp={handleKeyUpCallback}
        onInput={handleInputCallback}
        onPaste={handlePasteCallback}
        onFocus={onFocus}
        onMouseUp={handleMouseUpCallback}
        suppressContentEditableWarning={true}
        tabIndex={0}
        style={style}
      />
      {enableMention && (
        <MentionMenu
          ref={mentionMenuRef}
          visible={isMentionOpen}
          portalStyle={portalStyle}
          keyword={keywordRef.current}
          onClose={hideMentionMenuCallback}
          onSelect={handleMentionSelectCallback}
        />
      )}
      {enableCommand && (
        <CommandMenu
          ref={commandMenuRef}
          visible={isCommandOpen}
          portalStyle={portalStyle}
          keyword={keywordRef.current}
          onClose={hideCommandMenuCallback}
          onSelect={handleCommandSelectCallback}
        />
      )}
      {enableTextFormat && (
        <FloatingToolbar
          visible={isToolbarOpen}
          range={toolbarRange}
          onChange={throttledUpdate}
          onClose={hideToolbarCallback}
        />
      )}
    </>
  )
}
export const RichText = RichTextComponent
// export const RichText = memo(RichTextComponent, (prevProps, nextProps) => {
//   return !deepEqual(prevProps.field, nextProps.field)
// })

const Container = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  font-weight: 500;
  color: ${props => props.theme.question};
  font-size: ${props => props.theme.questionFontSize};
  line-height: 1.1875;
  outline: none;
`
