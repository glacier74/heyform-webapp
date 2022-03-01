import { ComponentProps, Flex, Spin } from '@heyui/component'
import { FC } from 'react'
import styled from 'styled-components'

interface LoadingMaskProps extends ComponentProps {
  spinClassName?: string
}

export const Loader: FC<LoadingMaskProps> = ({ className, style, spinClassName }) => {
  return (
    <Container className={className} style={style} align="center" justify="center">
      <Spin className={spinClassName} />
    </Container>
  )
}

const Container = styled(Flex)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  svg {
    width: 20px !important;
    height: 20px !important;
  }
`
