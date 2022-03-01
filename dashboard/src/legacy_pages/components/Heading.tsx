import { ComponentProps } from '@heyui/component'
import { FC, ReactNode } from 'react'
import styled from 'styled-components'

interface HeadingProps extends ComponentProps {
  description?: ReactNode
}

export const Heading: FC<HeadingProps> = ({ description, children, ...restProps }) => {
  return (
    <Container {...restProps}>
      <Title className="heading-title">{children}</Title>
      {description && <Description className="heading-description">{description}</Description>}
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 24px;
`

const Title = styled.div`
  font-size: 30px;
  color: #323b4b;
  line-height: 1.4;
  font-weight: 600;
`

const Description = styled.div`
  margin-top: 8px;
  color: #000000;
  font-size: 16px;
  line-height: 24px;
`
