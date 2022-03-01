import { Skeleton } from '@/legacy_pages/components'
import { Flex } from '@heyui/component'
import { FC } from 'react'
import styled from 'styled-components'

const TemplateSkeletonItem: FC = () => {
  return (
    <Container>
      <Skeleton.Bar height={148} style={{ borderRadius: 15 }} />
      <Skeleton.Bar height={14} top={27} bottom={4} />
      <Skeleton.Bar width={80} height={14} />
    </Container>
  )
}

export const TemplateSkeleton: FC = () => {
  return (
    <Flex wrap="wrap" style={{ marginLeft: -16, marginRight: -16 }}>
      <TemplateSkeletonItem />
      <TemplateSkeletonItem />
      <TemplateSkeletonItem />
      <TemplateSkeletonItem />
    </Flex>
  )
}

const Container = styled.div`
  position: relative;
  width: 218px;
  height: 264px;
  margin: 0 16px 32px 16px;
  padding: 16px;
  background: #ffffff;
  border-radius: 3px;
`
