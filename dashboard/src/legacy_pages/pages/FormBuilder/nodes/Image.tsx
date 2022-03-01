import { Flex } from '@heyui/component'
import { isURL } from '@hpnp/utils/helper'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { ImageIcon, ImageUploader } from '../components'
import { useStoreContext } from '../store'
import { Node, NodeProps } from './Block'

export const Image: FC<NodeProps> = props => {
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
          <img src={sourceUrl} loading="lazy" />
        ) : (
          <>
            <AddContainer align="center" onClick={() => setVisible(true)}>
              <ImageIcon />
              <span>Add an image</span>
            </AddContainer>
          </>
        )}

        <ImageUploader
          visible={visible}
          onClose={() => setVisible(false)}
          onChange={handleChange}
        />
      </Container>
    </Node>
  )
}

const Container = styled.div`
  img {
    display: block;
    width: 100%;
    height: auto;
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
