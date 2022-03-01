import { ComponentProps, Flex } from '@heyui/component'
import { alpha } from '@hpnp/utils/color'
import { FC } from 'react'
import styled from 'styled-components'

export const PageBreakItem: FC<ComponentProps> = ({ children, ...restProps }) => {
  return (
    <Container align="center" {...restProps}>
      <Text>{children}</Text>
    </Container>
  )
}

const Container = styled(Flex)`
  position: relative;
  padding: 4px 0;

  &:before,
  &:after {
    content: '';
    flex: 1;
    position: relative;
    top: 50%;
    transform: translateY(50%);
    border-top: 1px solid ${props => alpha(props.theme.answer, 0.1)};
  }
`

const Text = styled.div`
  padding: 0 2em;
`
