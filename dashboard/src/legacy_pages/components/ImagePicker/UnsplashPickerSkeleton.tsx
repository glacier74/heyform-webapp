import { FC } from 'react'
import styled from 'styled-components'
import { Skeleton } from '../Skeleton'

export const UnsplashPickerLeftSkeleton: FC = () => {
  return (
    <>
      <ImageContainer>
        <Skeleton.Bar width={184} height={120} />
        <Skeleton.Bar width={80} height={12} top={4} />
      </ImageContainer>
      <ImageContainer>
        <Skeleton.Bar width={184} height={100} />
        <Skeleton.Bar width={80} height={12} top={4} />
      </ImageContainer>
      <ImageContainer>
        <Skeleton.Bar width={184} height={140} />
        <Skeleton.Bar width={80} height={12} top={4} />
      </ImageContainer>
      <ImageContainer>
        <Skeleton.Bar width={184} height={110} />
        <Skeleton.Bar width={80} height={12} top={4} />
      </ImageContainer>
    </>
  )
}

export const UnsplashPickerRightSkeleton: FC = () => {
  return (
    <>
      <ImageContainer>
        <Skeleton.Bar width={184} height={100} />
        <Skeleton.Bar width={80} height={12} top={4} />
      </ImageContainer>
      <ImageContainer>
        <Skeleton.Bar width={184} height={120} />
        <Skeleton.Bar width={80} height={12} top={4} />
      </ImageContainer>
      <ImageContainer>
        <Skeleton.Bar width={184} height={110} />
        <Skeleton.Bar width={80} height={12} top={4} />
      </ImageContainer>
      <ImageContainer>
        <Skeleton.Bar width={184} height={140} />
        <Skeleton.Bar width={80} height={12} top={4} />
      </ImageContainer>
    </>
  )
}

const ImageContainer = styled.div`
  margin-bottom: 16px;
  break-inside: avoid;
`
