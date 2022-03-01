import { Skeleton } from '@/legacy_pages/components'
import { Flex } from '@heyui/component'
import styled from 'styled-components'

const Item = () => {
  return (
    <ItemContainer align="center">
      <Skeleton.Bar width={54} height={54} right={20} style={{ borderRadius: 15 }} />
      <Flex auto={true}>
        <Skeleton.Bar width={120} height={20} bottom={4} />
        <Skeleton.Bar width={400} height={20} />
      </Flex>
      <Skeleton.Bar width={98} height={32} left={30} style={{ borderRadius: 12 }} />
    </ItemContainer>
  )
}

const ItemContainer = styled(Flex)`
  margin-top: 10px;
  margin-bottom: 10px;
`

export const IntegrationSkeleton = () => {
  return (
    <>
      <Skeleton.Bar width={84} height={25} top={60} bottom={24} />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </>
  )
}
