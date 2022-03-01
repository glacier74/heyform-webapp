import { ComponentProps, Flex } from '@heyui/component'
import { FC, ReactNode } from 'react'
import styled from 'styled-components'

interface EmptyDataViewProps extends ComponentProps {
  icon: ReactNode
  text: ReactNode
  button?: ReactNode
}

export const EmptyDataView: FC<EmptyDataViewProps> = ({ icon, text, button, ...restProps }) => {
  return (
    <Container align="center" justify="center" column={true} {...restProps}>
      <Icon>{icon}</Icon>
      <Text>{text}</Text>
      {button && button}
    </Container>
  )
}

const Container = styled(Flex)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;

  @media print {
    display: none;
  }
`

const Icon = styled.div`
  &,
  svg {
    width: 120px;
    height: 120px;
  }
`

const Text = styled.div`
  margin-top: 24px;
  width: 320px;
  text-align: center;
  color: ${props => props.theme.disabled};
`
