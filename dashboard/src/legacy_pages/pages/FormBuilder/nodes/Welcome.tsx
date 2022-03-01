import { FieldKindEnum } from '@heyforms/shared-types-enums'
import { Flex } from '@heyui/component'
import { alpha } from '@hpnp/utils/color'
import { FC, useRef } from 'react'
import styled from 'styled-components'
import { DeleteIcon, EmojiPicker, InsertBlockMenu, PseudoButton, RichText } from '../components'
import { useStoreContext } from '../store'

export const Welcome: FC = () => {
  const { state, dispatch } = useStoreContext()
  const titleRef = useRef()
  const bodyRef = useRef()

  function handleDelete() {
    dispatch({
      type: 'deleteWelcome'
    })
  }

  function handleIconChange(icon: string) {
    dispatch({
      type: 'updateWelcome',
      payload: {
        data: {
          icon
        }
      }
    })
  }

  function handleTitleChange(title: string) {
    dispatch({
      type: 'updateWelcome',
      payload: {
        data: {
          title
        }
      }
    })
  }

  function handleBodyChange(body: string) {
    dispatch({
      type: 'updateWelcome',
      payload: {
        data: {
          body
        }
      }
    })
  }

  function handleFocus() {
    dispatch({
      type: 'clearSelection'
    })
  }

  return (
    <Container id="block-welcome" className="block block-welcome">
      <div className="block-container">
        <Actions className="block-actions" align="center" justify="flex-end">
          <ActionButton onClick={handleDelete}>
            <DeleteIcon />
          </ActionButton>
          <InsertBlockMenu field={{ id: FieldKindEnum.WELCOME, kind: FieldKindEnum.WELCOME }} />
        </Actions>
        <div className="block-content">
          <div className="block-welcome-icon">
            <EmojiPicker value={state.welcome?.icon} onChange={handleIconChange} />
          </div>
          <RichText
            innerRef={titleRef}
            enableMention={false}
            enableCommand={false}
            className="block-welcome-title"
            placeholder="Welcome Title"
            value={state.welcome?.title}
            onFocus={handleFocus}
            onChange={handleTitleChange}
          />
          <RichText
            innerRef={bodyRef}
            enableMultiLine={true}
            enableMention={false}
            enableCommand={false}
            className="block-welcome-body"
            placeholder="Welcome Description"
            value={state.welcome?.body}
            onFocus={handleFocus}
            onChange={handleBodyChange}
          />
          <Flex justify="center" style={{ paddingTop: 60 }}>
            <PseudoButton>Get Started</PseudoButton>
          </Flex>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  padding-bottom: 30px;

  .block-welcome-title {
    margin-top: 60px;
    font-weight: 700;
    line-height: ${props => props.theme.lineHeight};
    color: ${props => props.theme.question};
    font-size: 24px;

    a {
      color: ${props => alpha(props.theme.question, 0.3)};
      text-decoration: underline;
    }
  }

  .block-welcome-body {
    font-weight: 500;
    margin-top: 20px;
    color: ${props => alpha(props.theme.question, 0.3)};
    font-size: 20px;

    b,
    strong {
      font-weight: 700;
    }

    a {
      color: ${props => alpha(props.theme.question, 0.3)};
      text-decoration: underline;
    }
  }

  .block-content {
    padding-bottom: 100px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .block-welcome-icon {
    display: flex;
    justify-content: center;
    padding-top: 30px;
  }

  .block-welcome-title,
  .block-welcome-body {
    text-align: center;

    &:empty:before {
      position: absolute;
      pointer-events: none;
      content: attr(placeholder);
      color: rgba(0, 0, 0, 0.3);
      transform: translateX(-50%);
    }
  }

  .block-container {
    &:hover {
      .block-actions {
        opacity: 1;
      }
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
