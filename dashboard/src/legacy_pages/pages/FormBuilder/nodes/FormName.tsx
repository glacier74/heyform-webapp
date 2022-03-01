import { RichText } from '@/legacy_pages/pages/FormBuilder/components'
import { useStoreContext } from '@/legacy_pages/pages/FormBuilder/store'
import { ComponentProps } from '@heyui/component'
import { FC, useRef } from 'react'
import styled from 'styled-components'

export const FormName: FC<ComponentProps> = () => {
  const { state, dispatch } = useStoreContext()
  const nameRef = useRef<any>()

  function handleFocus() {
    dispatch({
      type: 'clearSelection'
    })
  }

  function handleNameChange(value: string) {
    dispatch({
      type: 'setName',
      payload: {
        name: value
      }
    })
  }

  return (
    <Container id="block-title" className="block-container">
      <RichText
        className="block-title"
        innerRef={nameRef}
        value={state.name}
        onFocus={handleFocus}
        onChange={handleNameChange}
        placeholder="Form title"
      />
    </Container>
  )
}

const Container = styled.div`
  .block-title {
    padding-top: 75px;
    font-weight: 700;
    color: ${props => props.theme.title};
    font-size: ${props => props.theme.titleFontSize};
    line-height: 1.5;
  }
`
