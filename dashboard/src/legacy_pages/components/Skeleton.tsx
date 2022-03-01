import { ComponentProps } from '@heyui/component'
import { FC } from 'react'
import styled, { keyframes } from 'styled-components'

interface SkeletonProps extends ComponentProps {
  width?: number
  height?: number
  size?: number
  top?: number
  right?: number
  bottom?: number
  left?: number
  round?: boolean
}

const Bar: FC<SkeletonProps> = ({
  className,
  width,
  height,
  top,
  right,
  bottom,
  left,
  round,
  style
}) => {
  return (
    <Container
      className={className}
      style={{
        width,
        height,
        borderRadius: round ? height! / 2 : 4,
        marginTop: top,
        marginRight: right,
        marginBottom: bottom,
        marginLeft: left,
        ...style
      }}
    />
  )
}

const Circle: FC<SkeletonProps> = ({
  className,
  size,
  top,
  right,
  bottom,
  left,
  round = true,
  style
}) => {
  return (
    <Container
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: round ? size! / 2 : 4,
        marginTop: top,
        marginRight: right,
        marginBottom: bottom,
        marginLeft: left,
        ...style
      }}
    />
  )
}

export const Skeleton: {
  Bar: FC<SkeletonProps>
  Circle: FC<SkeletonProps>
} = {
  Bar,
  Circle
}

const loading = keyframes`
  from {
    background-position: 100% 50%
  }

  to {
    background-position: 0 50%
  }
`

const Container = styled.div`
  background: linear-gradient(90deg, #f5f6f7 25%, #eef0f1 37%, #f5f6f7 63%);
  background-size: 400% 100%;
  animation: ${loading} 1.4s ease infinite;
`
