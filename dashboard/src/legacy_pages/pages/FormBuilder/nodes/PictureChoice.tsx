import {
  Choice,
  FieldSelection,
  FieldSelectionTypeEnum,
  FormField
} from '@heyforms/shared-types-enums'
import { Button, ComponentProps, Flex } from '@heyui/component'
import { isEmpty, isNumber } from '@hpnp/utils/helper'
import { nanoid } from '@hpnp/utils/nanoid'
import { FC, useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import { AddIcon, CloseIcon, ImageUploader, InlineText } from '../components'
import { useStoreContext } from '../store'
import { placeCaretAtEnd } from '../utils'
import { Block, BlockProps } from './Block'

interface PictureChoiceItemProps extends ComponentProps {
  field: FormField
  choice: Choice
  index: number
}

const PictureChoiceItem: FC<PictureChoiceItemProps> = ({
  field,
  choice,
  index,
  children,
  ...restProps
}) => {
  const { dispatch } = useStoreContext()
  const [visible, setVisible] = useState(false)

  function handleChange(image: string) {
    dispatch({
      type: 'updateChoice',
      payload: {
        id: field.id,
        choice: {
          ...choice,
          image
        },
        index
      }
    })
  }

  function handleRemove() {
    dispatch({
      type: 'deleteChoice',
      payload: {
        id: field.id,
        index
      }
    })
  }

  return (
    <ItemContainer {...restProps}>
      <ItemPadding>
        <ImageContainer onClick={() => setVisible(true)}>
          <img src={choice.image} />
        </ImageContainer>
        {children}
        <RemoveButton icon={<CloseIcon />} onClick={handleRemove} />
      </ItemPadding>

      <ImageUploader visible={visible} onClose={() => setVisible(false)} onChange={handleChange} />
    </ItemContainer>
  )
}

export const PictureChoice: FC<BlockProps> = ({ field, ...restProps }) => {
  const { state, dispatch } = useStoreContext()
  const focusRef = useRef<number>()
  const [visible, setVisible] = useState(false)

  function blockSelect(element: HTMLElement, selection: FieldSelection) {
    const len = field.properties?.choices?.length || 0

    switch (selection.type) {
      case FieldSelectionTypeEnum.PREVIOUS:
        return handleFocusCallback(len - 1)

      case FieldSelectionTypeEnum.NEXT:
      case FieldSelectionTypeEnum.FOCUS:
        return placeCaretAtEnd(element)

      case FieldSelectionTypeEnum.INLINE_FOCUS:
        return handleFocusCallback(focusRef.current)
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
    focusRef.current = undefined

    const elements: HTMLElement[] = Array.from(
      document.getElementById(`block-${field.id}`)!.querySelectorAll('.block-inline-text')
    )

    elements[index] && placeCaretAtEnd(elements[index])
  }

  function handleUp(index: number) {
    if (index > 0) {
      focusRef.current = index - 1
      handleFocus(focusRef.current)
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

  function handleChange(label: string, index = 0) {
    const choice = {
      ...field.properties!.choices![index],
      label
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

  function handleAddChoice(image: string) {
    setVisible(false)
    focusRef.current = field.properties!.choices!.length

    dispatch({
      type: 'selectField',
      payload: {
        id: field.id,
        type: FieldSelectionTypeEnum.INLINE_FOCUS
      }
    })

    dispatch({
      type: 'addChoice',
      payload: {
        id: field.id,
        choice: {
          id: nanoid(12),
          label: '',
          image
        }
      }
    })
  }

  const blockSelectCallback = useCallback(blockSelect, [field])
  const blockFocusCallback = useCallback(blockFocus, [field])
  const blockUpCallback = useCallback(blockUp, [field])
  const blockEnterCallback = useCallback(blockEnter, [field])
  const blockDeleteCallback = useCallback(blockDelete, [field])
  const handleFocusCallback = useCallback(handleFocus, [field])
  const handleUpCallback = useCallback(handleUp, [field])
  const handleDownCallback = useCallback(handleDown, [field])
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
      <StyledFlex wrap="wrap" align="stretch">
        {field.properties?.choices?.map((choice, index) => (
          <PictureChoiceItem
            key={choice.id}
            index={index}
            count={field.properties!.choices!.length}
            field={field}
            choice={choice}
          >
            <StyledInlineText
              value={choice.label}
              index={index}
              placeholder={`Choice ${index + 1}`}
              onFocus={handleFocusCallback}
              onUp={handleUpCallback}
              onDown={handleDownCallback}
              onChange={handleChangeCallback}
            />
          </PictureChoiceItem>
        ))}
        <AddChoiceButton>
          <ItemPadding onClick={() => setVisible(true)}>
            <AddIcon />
            <span>Add choice</span>
          </ItemPadding>
        </AddChoiceButton>
      </StyledFlex>

      <ImageUploader
        visible={visible}
        onClose={() => setVisible(false)}
        onChange={handleAddChoice}
      />
    </Block>
  )
}

const StyledFlex = styled(Flex)`
  margin-left: -10px;
  margin-right: -10px;
`

const ItemContainer = styled.div`
  flex: 0 0 25%;
  width: auto;
  padding: 10px;
  overflow: hidden;

  .block-inline-text {
    padding: 6px 8px;
  }
`

const RemoveButton = styled(Button)`
  display: none;
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  border: none;
  padding: 0;
  background: #333;
  color: #fff;
  border-radius: 10px;

  &:hover {
    background: #666;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`

const ItemPadding = styled(Flex)`
  position: relative;
  flex-direction: column;
  height: 114px;
  background: #fff;
  border-radius: 2px;
  color: rgb(134, 134, 134);
  box-shadow: rgb(134 134 134 / 15%) 0px 2px 4px;

  &:hover {
    ${RemoveButton} {
      display: block;
    }
  }
`

const ImageContainer = styled.div`
  position: relative;
  height: 85px;

  img {
    width: 100%;
    height: 100%;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    object-fit: cover;
    background: #f1f1f1;
  }
`

const StyledInlineText = styled(InlineText)`
  flex: 1;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
`

const AddChoiceButton = styled(ItemContainer)`
  ${ItemPadding} {
    align-items: center;
    justify-content: center;
    border: 1px dashed #d1d0d6;
    cursor: pointer;
  }
`
