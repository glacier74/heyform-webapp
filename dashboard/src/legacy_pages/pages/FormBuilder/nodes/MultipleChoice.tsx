import { FieldKindEnum, FieldSelection, FieldSelectionTypeEnum } from '@heyforms/shared-types-enums'
import { isEmpty, isNumber } from '@hpnp/utils/helper'
import { nanoid } from '@hpnp/utils/nanoid'
import { FC, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { InlineText, PseudoCheckbox } from '../components'
import { useStoreContext } from '../store'
import { getFieldFromKind, placeCaretAtEnd } from '../utils'
import { Block, BlockProps } from './Block'

export const MultipleChoice: FC<BlockProps> = ({ field, ...restProps }) => {
  const { state, dispatch } = useStoreContext()
  const focusRef = useRef<number>()

  function blockSelect(element: HTMLElement, selection: FieldSelection) {
    const len = field.properties?.choices?.length || 0

    switch (selection.type) {
      case FieldSelectionTypeEnum.PREVIOUS:
        return handleFocus(len - 1)

      case FieldSelectionTypeEnum.NEXT:
      case FieldSelectionTypeEnum.FOCUS:
        return placeCaretAtEnd(element)

      case FieldSelectionTypeEnum.INLINE_FOCUS:
        return handleFocus(focusRef.current)
    }
  }

  function blockFocus() {
    dispatch({
      type: 'selectField',
      payload: {
        id: field.id,
        type: FieldSelectionTypeEnum.FOCUS
      }
    })
  }

  function blockDelete() {
    dispatch({
      type: 'deleteField',
      payload: {
        id: field.id
      }
    })
  }

  function blockUp() {
    dispatch({
      type: 'selectPrevious',
      payload: {
        id: field.id
      }
    })
  }

  function blockEnter() {
    focusRef.current = 0
    dispatch({
      type: 'selectField',
      payload: {
        id: field.id,
        type: FieldSelectionTypeEnum.INLINE_FOCUS
      }
    })
  }

  function handleFocus(index: any) {
    if (isEmpty(index) || !isNumber(index)) {
      return
    }

    if (state.selection?.id !== field.id) {
      dispatch({
        type: 'selectField',
        payload: {
          id: field.id,
          type: FieldSelectionTypeEnum.INLINE_FOCUS
        }
      })
    }

    // Reset focus index
    focusRef.current = index

    const elements: HTMLElement[] = Array.from(
      document.getElementById(`block-${field.id}`)!.querySelectorAll('.block-inline-text')
    )

    elements[index] && placeCaretAtEnd(elements[index])
  }

  function handleUp(index = 0) {
    if (index > 0) {
      handleFocus(index - 1)
    } else {
      blockFocus()
    }
  }

  function handleDown(index = 0) {
    const len = field.properties?.choices?.length || 0

    if (index < len - 1) {
      handleFocus(index + 1)
    } else {
      dispatch({
        type: 'selectNext',
        payload: {
          id: field.id
        }
      })
    }
  }

  function handleEnter(value: string, index = 0) {
    const len = field.properties?.choices?.length || 0

    if (isEmpty(value)) {
      if (index > 0) {
        // Remove current choice and focus on next one
        dispatch({
          type: 'deleteChoice',
          payload: {
            id: field.id,
            index
          }
        })

        // Focus on next choice
        focusRef.current = index
        dispatch({
          type: 'selectField',
          payload: {
            id: field.id,
            type: FieldSelectionTypeEnum.INLINE_FOCUS
          }
        })
      }

      if ((len === 1 && index === 1) || index === len - 1) {
        const textField = getFieldFromKind(FieldKindEnum.TEXT)
        dispatch({
          type: 'addField',
          payload: {
            afterId: field.id,
            field: textField
          }
        })
      }
    } else {
      // Create new choice
      const choice = {
        id: nanoid(12),
        label: ''
      }
      dispatch({
        type: 'addChoice',
        payload: {
          id: field.id,
          choice,
          insertAt: index + 1
        }
      })

      // Focus on next choice
      focusRef.current = index + 1
      dispatch({
        type: 'selectField',
        payload: {
          id: field.id,
          type: FieldSelectionTypeEnum.INLINE_FOCUS
        }
      })
    }
  }

  function handleDelete(index = 0) {
    if (index > 0) {
      // Remove current choice and focus on prev one
      dispatch({
        type: 'deleteChoice',
        payload: {
          id: field.id,
          index
        }
      })

      // Focus on prev choice
      focusRef.current = index - 1
      dispatch({
        type: 'selectField',
        payload: {
          id: field.id,
          type: FieldSelectionTypeEnum.INLINE_FOCUS
        }
      })
    } else {
      dispatch({
        type: 'selectField',
        payload: {
          id: field.id
        }
      })
    }
  }

  function handleChange(value: string, index = 0) {
    const choice = {
      ...field.properties!.choices![index],
      label: value
    }

    dispatch({
      type: 'updateChoice',
      payload: {
        id: field.id,
        choice,
        index
      }
    })
  }

  const blockSelectCallback = useCallback(blockSelect, [field])
  const blockEnterCallback = useCallback(blockEnter, [field])
  const blockFocusCallback = useCallback(blockFocus, [field])
  const blockUpCallback = useCallback(blockUp, [field])
  const blockDeleteCallback = useCallback(blockDelete, [field])
  const handleEnterCallback = useCallback(handleEnter, [field])
  const handleFocusCallback = useCallback(handleFocus, [field])
  const handleUpCallback = useCallback(handleUp, [field])
  const handleDownCallback = useCallback(handleDown, [field])
  const handleDeleteCallback = useCallback(handleDelete, [field])
  const handleChangeCallback = useCallback(handleChange, [field])

  return (
    <Block
      field={field}
      placeholder="Type a question"
      onSelect={blockSelectCallback}
      onFocus={blockFocusCallback}
      onUp={blockUpCallback}
      onDown={blockEnterCallback}
      onEnter={blockEnterCallback}
      onDelete={blockDeleteCallback}
      {...restProps}
    >
      <div>
        {field.properties?.choices?.map((choice, index) => (
          <StyledPseudoCheckbox key={choice.id} contentEditable={undefined}>
            <StyledInlineText
              index={index}
              value={choice.label}
              placeholder={`Choice ${index + 1}`}
              onFocus={handleFocusCallback}
              onUp={handleUpCallback}
              onDown={handleDownCallback}
              onEnter={handleEnterCallback}
              onDelete={handleDeleteCallback}
              onChange={handleChangeCallback}
            />
          </StyledPseudoCheckbox>
        ))}
      </div>
    </Block>
  )
}

const StyledPseudoCheckbox = styled(PseudoCheckbox)`
  margin-top: 12px;

  &:nth-of-type(1) {
    margin-top: 0;
  }
`

const StyledInlineText = styled(InlineText)`
  flex: 1;
`
