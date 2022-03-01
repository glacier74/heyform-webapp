import { ComponentProps, Flex } from '@heyui/component'
import { FC, ReactNode } from 'react'
import styled from 'styled-components'

interface IconTextProps extends ComponentProps {
  icon: ReactNode
  text: string
  onClick?: () => void
}

export const IconText: FC<IconTextProps> = ({ className, style, icon, text, onClick }) => {
  return (
    <Container className={className} style={style} align="center" onClick={onClick}>
      {icon}
      <Text>{text}</Text>
    </Container>
  )
}

const Container = styled(Flex)`
  svg {
    width: 24px;
    height: 24px;
    margin-left: -2px;
    padding: 2px;
  }
`

const Text = styled.span`
  margin-left: 10px;
`
