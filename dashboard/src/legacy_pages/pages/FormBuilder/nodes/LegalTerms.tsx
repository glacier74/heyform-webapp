import { FieldKindEnum, FieldSelection, FieldSelectionTypeEnum } from '@heyforms/shared-types-enums'
import { FC, useRef } from 'react'
import styled from 'styled-components'
import { PseudoCheckbox, RichText } from '../components'
import { useStoreContext } from '../store'
import { getFieldFromKind, placeCaretAtEnd } from '../utils'
import { Block, BlockProps } from './Block'

export const LegalTerms: FC<BlockProps> = ({ field, ...restProps }) => {
  const { dispatch } = useStoreContext()
  const ref = useRef()

  function blockSelect(element: HTMLElement, selection: FieldSelection) {
    switch (selection.type) {
      case FieldSelectionTypeEnum.PREVIOUS:
        return blockEnter()

      case FieldSelectionTypeEnum.NEXT:
      default:
        placeCaretAtEnd(element)
    }
  }

  function blockFocus() {
    dispatch({
      type: 'selectField',
      payload: {
        id: field.id
      }
    })
  }

  function blockEnter() {
    ref.current && placeCaretAtEnd(ref.current)
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

  function handleDown() {
    dispatch({
      type: 'selectNext',
      payload: {
        id: field.id
      }
    })
  }

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
      type: 'selectField',
      payload: {
        id: field.id
      }
    })
  }

  return (
    <Block
      field={field}
      placeholder="Type a question"
      onSelect={blockSelect}
      onFocus={blockFocus}
      onUp={blockUp}
      onDown={blockEnter}
      onEnter={blockEnter}
      onDelete={blockDelete}
      {...restProps}
    >
      <PseudoCheckbox className="block-legal-terms-container" contentEditable={undefined}>
        <StyledRichText
          innerRef={ref}
          field={field}
          placeholder="Type description"
          enableCommand={false}
          enableMention={false}
          onUp={blockFocus}
          onDown={handleDown}
          onEnter={handleEnter}
          onDelete={handleDelete}
        />
      </PseudoCheckbox>
    </Block>
  )
}

const StyledRichText = styled(RichText)`
  flex: 1;
`
