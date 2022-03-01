import { Flex, FlexProps } from '@heyui/component'
import { FC, ReactNode } from 'react'
import styled from 'styled-components'

interface SubHeadingProps extends FlexProps {
  id?: string
  description?: ReactNode
  action?: ReactNode
}

export const SubHeading: FC<SubHeadingProps> = ({
  children,
  description,
  action,
  ...restProps
}) => {
  return (
    <Container justify="space-between" {...restProps}>
      <Left>
        <Title className="subheading-title">{children}</Title>
        {description && <Description className="subheading-description">{description}</Description>}
      </Left>
      {action && action}
    </Container>
  )
}

const Left = styled.div``

const Title = styled.div`
  font-size: 18px;
  color: rgb(55, 53, 47);
  line-height: 1.4;
  font-weight: 500;
  margin-bottom: 12px;
`

const Description = styled.div`
  margin-top: 4px;
  color: #8a94a6;
`

const Container = styled(Flex)`
  margin-top: 44px;
  margin-bottom: 20px;
`
