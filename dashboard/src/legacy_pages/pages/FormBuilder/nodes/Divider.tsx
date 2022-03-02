import { alpha } from '@hpnp/utils/color'
import { FC } from 'react'
import styled from 'styled-components'
import { Node, NodeProps } from './Block'

const Container = styled.div`
  padding: 16px 0;
`

const Line = styled.div`
  height: 1px;
  background: ${props => alpha(props.theme.answer, 0.1)};
`

const children = (
  <Container>
    <Line />
  </Container>
)

export const Divider: FC<NodeProps> = props => {
  return <Node {...props}>{children}</Node>
}
