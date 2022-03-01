import { Flex } from '@heyui/component'
import { isURL } from '@hpnp/utils/helper'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { EmbedLink, ImageIcon } from '../components'
import { useStoreContext } from '../store'
import { Node, NodeProps } from './Block'

export const Embed: FC<NodeProps> = props => {
  const { state, dispatch } = useStoreContext()
  const sourceUrl = props.field.properties?.sourceUrl
  const [visible, setVisible] = useState(false)

  function handleChange(sourceUrl: string) {
    setVisible(false)
    dispatch({
      type: 'updateField',
      payload: {
        id: props.field.id,
        updates: {
          properties: {
            ...props.field.properties,
            sourceUrl
          }
        }
      }
    })
  }

  useEffect(() => {
    if (state.embedTrigger === props.field.id) {
      setVisible(true)
      dispatch({
        type: 'clearEmbedTrigger'
      })
    }
  }, [state.embedTrigger])

  return (
    <Node {...props}>
      <Container>
        {isURL(sourceUrl) ? (
          <iframe
            src={sourceUrl}
            title={sourceUrl}
            frameBorder="0"
            sandbox="allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <>
            <AddContainer align="center" onClick={() => setVisible(true)}>
              <ImageIcon />
              <span>Embed Link</span>
            </AddContainer>
          </>
        )}

        <EmbedLink visible={visible} onClose={() => setVisible(false)} onChange={handleChange} />
      </Container>
    </Node>
  )
}

const Container = styled.div`
  iframe {
    width: 100%;
    height: 400px;
  }
`

const AddContainer = styled(Flex)`
  padding: 6px;
  background: #eee;
  border-radius: 4px;
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
`
