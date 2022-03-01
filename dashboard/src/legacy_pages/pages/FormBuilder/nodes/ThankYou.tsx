import { Flex } from '@heyui/component'
import { alpha } from '@hpnp/utils/color'
import { FC, useRef } from 'react'
import styled from 'styled-components'
import { DeleteIcon, EmojiPicker, RichText } from '../components'
import { useStoreContext } from '../store'

export const ThankYou: FC = () => {
  const { state, dispatch } = useStoreContext()
  const titleRef = useRef()
  const bodyRef = useRef()

  function handleDelete() {
    dispatch({
      type: 'deleteThankYou'
    })
  }

  function handleIconChange(icon: string) {
    dispatch({
      type: 'updateThankYou',
      payload: {
        data: {
          icon
        }
      }
    })
  }

  function handleTitleChange(title: string) {
    dispatch({
      type: 'updateThankYou',
      payload: {
        data: {
          title
        }
      }
    })
  }

  function handleBodyChange(body: string) {
    dispatch({
      type: 'updateThankYou',
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
    <Container id="block-thankyou" className="block block-thankyou">
      <div className="block-container">
        <Actions className="block-actions" align="center" justify="flex-end">
          <ActionButton onClick={handleDelete}>
            <DeleteIcon />
          </ActionButton>
        </Actions>
        <div className="block-content">
          <div className="block-thankyou-icon">
            <EmojiPicker value={state.thankYou?.icon} onChange={handleIconChange} />
          </div>
          <RichText
            innerRef={titleRef}
            enableMention={true}
            enableCommand={false}
            className="block-thankyou-title"
            placeholder="Thank You Title"
            value={state.thankYou?.title}
            onFocus={handleFocus}
            onChange={handleTitleChange}
          />
          <RichText
            innerRef={bodyRef}
            enableMultiLine={true}
            enableMention={true}
            enableCommand={false}
            className="block-thankyou-body"
            placeholder="Thank You Description"
            value={state.thankYou?.body}
            onFocus={handleFocus}
            onChange={handleBodyChange}
          />
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  padding-top: 30px;

  .block-thankyou-title {
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

  .block-thankyou-body {
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
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .block-thankyou-icon {
    display: flex;
    justify-content: center;
    padding-top: 30px;
  }

  .block-thankyou-title,
  .block-thankyou-body {
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
