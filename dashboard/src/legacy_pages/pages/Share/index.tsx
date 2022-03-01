import { Flex } from '@heyui/component'
import { FC } from 'react'
import styled from 'styled-components'
import { EmbedWeb } from './views/EmbedWeb'
import { ShareByLink } from './views/ShareByLink'
import { ShareToAudience } from './views/ShareToAudience'

const Share: FC = () => {
  return (
    <Container>
      <Flex style={{ marginBottom: 60 }}>
        <ShareByLink />
        <ShareToAudience />
      </Flex>
      <EmbedWeb />
    </Container>
  )
}

const Container = styled.div`
  width: 1044px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 80px;
  padding-bottom: 64px;
`

export default Share
