import { ComponentProps, Flex } from '@heyui/component'
import { FC, ReactNode } from 'react'
import styled from 'styled-components'

interface BlankViewProps extends ComponentProps {
  icon: ReactNode
  heading: ReactNode
  button?: ReactNode
}

export const BlankView: FC<BlankViewProps> = ({ icon, heading, button, ...restProps }) => {
  return (
    <Container column={true} align="center" {...restProps}>
      <Icon>{icon}</Icon>
      <Heading>{heading}</Heading>
      <Flex justify="center">{button && button}</Flex>
    </Container>
  )
}

const Container = styled(Flex)`
  margin-top: 80px;
  margin-bottom: 80px;

  .hey-button {
    height: 40px;
  }
`

const Icon = styled.div`
  margin-bottom: 40px;

  &,
  svg {
    width: 100px;
    height: 100px;
  }
`

const Heading = styled.div`
  margin-bottom: 20px;
  text-align: center;

  .heading-title {
    font-size: 22px;
  }
`
