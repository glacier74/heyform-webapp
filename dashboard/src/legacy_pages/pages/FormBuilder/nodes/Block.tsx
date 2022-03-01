import {
  FieldKindEnum,
  FieldSelection,
  FieldSelectionTypeEnum,
  FormField
} from '@heyforms/shared-types-enums'
import { htmlUtils } from '@heyforms/answer-utils'
import { ComponentProps, Flex } from '@heyui/component'
import { alpha } from '@hpnp/utils/color'
import { isEmpty } from '@hpnp/utils/helper'
import clsx from 'clsx'
import { FC, useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { BlockSettingsMenu, DeleteIcon, InsertBlockMenu, RichText } from '../components'
import { useStoreContext } from '../store'
import { getFieldFromKind, placeCaretAtEnd } from '../utils'

export interface NodeProps extends ComponentProps {
  field: FormField
}

export interface BlockProps extends NodeProps {
  placeholder?: string
  enableMention?: boolean
  enableCommand?: boolean
  enableTextFormat?: boolean
  onFocus?: (element: HTMLDivElement, fieldId?: string) => void
  onSelect?: (element: HTMLDivElement, selection: FieldSelection) => void
  onUp?: () => void
  onDown?: () => void
  onEnter?: () => void
  onDelete?: () => void
}

export const Node: FC<NodeProps> = ({ field, className, children, ...restProps }) => {
  const { state, dispatch } = useStoreContext()

  function handleDelete() {
    dispatch({ type: 'deleteField', payload: { id: field.id } })
  }

  return (
    <Container
      id={`block-${field.id}`}
      className={clsx('block', className, {
        'block-selected': state.selection?.id === field.id,
        [`block-${field.kind.replace(/_/g, '-')}`]: true
      })}
      {...restProps}
    >
      <div className="block-container">
        <Actions className="block-actions" {...restProps} align="center" justify="flex-end">
          <ActionButton onClick={handleDelete}>
            <DeleteIcon />
          </ActionButton>
          <InsertBlockMenu field={field} />
          <BlockSettingsMenu field={field} />
        </Actions>
        <div className="block-content">{children}</div>
      </div>
    </Container>
  )
}

const BlockComponent: FC<BlockProps> = ({
  field,
  placeholder,
  enableMention,
  enableCommand,
  enableTextFormat,
  children,
  onFocus,
  onSelect,
  onUp,
  onDown,
  onEnter,
  onDelete,
  ...restProps
}) => {
  const ref = useRef<any>()
  const { state, dispatch } = useStoreContext()

  function handleChange(value: string) {
    let text = htmlUtils.plain(value, 24)

    if (isEmpty(text)) {
      text = 'Untitled question'
    }

    // Update all mention text
    if (text.length < 24) {
      Array.from(document.querySelectorAll(`span.mention[data-mention="${field.id}"]`)).forEach(
        node => {
          node.innerHTML = `@${text}`
        }
      )
    }

    dispatch({
      type: 'updateField',
      payload: {
        id: field.id,
        updates: {
          title: value
        }
      }
    })
  }

  function handleCommandSelect(kind: FieldKindEnum) {
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
        type: 'replaceField',
        payload: {
          replaceId: field.id,
          field: getFieldFromKind(kind)
        }
      })
    }
  }

  function handleFocus() {
    onFocus && onFocus(ref.current, field.id)
  }

  useEffect(() => {
    if (ref.current && state.selection?.id === field.id) {
      onSelect && onSelect(ref.current, state.selection)
    }
  }, [ref, state.selection])

  const handleFocusCallback = useCallback(handleFocus, [])
  const handleChangeCallback = useCallback(handleChange, [])
  const handleCommandSelectCallback = useCallback(handleCommandSelect, [])

  return (
    <Node field={field} {...restProps}>
      <RichText
        innerRef={ref}
        value={field.title}
        placeholder={placeholder}
        enableCommand={enableCommand}
        enableMention={enableMention}
        enableTextFormat={enableTextFormat}
        onFocus={handleFocusCallback}
        onUp={onUp}
        onDown={onDown}
        onEnter={onEnter}
        onDelete={onDelete}
        onCommandSelect={handleCommandSelectCallback}
        onChange={handleChangeCallback}
      />
      {children}
    </Node>
  )
}
export const Block = BlockComponent
// export const Block = memo(BlockComponent, (prevProps, nextProps) => {
//   return !deepEqual(prevProps.field, nextProps.field)
// })

const QuestionBlockComponent: FC<BlockProps> = ({ field, children, ...restProps }) => {
  const { dispatch } = useStoreContext()

  function handleEnter() {
    const textField = getFieldFromKind(FieldKindEnum.TEXT)

    dispatch({
      type: 'addField',
      payload: {
        field: textField,
        afterId: field.id
      }
    })
  }

  function handleDelete() {
    dispatch({
      type: 'deleteField',
      payload: {
        id: field.id
      }
    })
  }

  function handleFocus() {
    dispatch({
      type: 'selectField',
      payload: {
        id: field.id,
        type: FieldSelectionTypeEnum.FOCUS
      }
    })
  }

  function handleSelect(element: HTMLDivElement) {
    // Don't change cart if FloatingToolbar is open
    // @ts-ignore
    if (!element.isToolbarOpen) {
      placeCaretAtEnd(element)
    }
  }

  function handleUp() {
    dispatch({
      type: 'selectPrevious',
      payload: {
        id: field.id
      }
    })
  }

  function handleDown() {
    dispatch({
      type: 'selectNext',
      payload: {
        id: field.id
      }
    })
  }

  const handleSelectCallback = useCallback(handleSelect, [])
  const handleFocusCallback = useCallback(handleFocus, [])
  const handleUpCallback = useCallback(handleUp, [])
  const handleDownCallback = useCallback(handleDown, [])
  const handleEnterCallback = useCallback(handleEnter, [])
  const handleDeleteCallback = useCallback(handleDelete, [])

  return (
    <Block
      field={field}
      placeholder="Type a question"
      enableCommand={false}
      onSelect={handleSelectCallback}
      onFocus={handleFocusCallback}
      onUp={handleUpCallback}
      onDown={handleDownCallback}
      onEnter={handleEnterCallback}
      onDelete={handleDeleteCallback}
      {...restProps}
    >
      {children}
    </Block>
  )
}
export const QuestionBlock = QuestionBlockComponent

const Container = styled.div`
  .block-container {
    position: relative;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 100px;
    padding-right: 100px;
  }

  .block-rich-text {
    font-weight: 500;
    color: ${props => props.theme.question};
    font-size: ${props => props.theme.questionFontSize};
  }

  .block-rich-text:empty {
    &:before {
      position: absolute;
      pointer-events: none;
      content: attr(placeholder);
      color: ${props => alpha(props.theme.question, 0.3)};
    }
  }

  &.block-heading-1 {
    .block-rich-text {
      font-size: 2em;
    }
  }

  &.block-heading-2 {
    .block-rich-text {
      font-size: 1.5em;
    }
  }

  &.block-heading-3 {
    .block-rich-text {
      font-size: 1.25em;
    }
  }

  &:hover,
  &.block-selected {
    .block-actions {
      opacity: 1;
    }
  }
`

const Actions = styled(Flex)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  padding-top: 8px;
  padding-right: 0;
  opacity: 0;
`

const ActionButton = styled.div`
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
