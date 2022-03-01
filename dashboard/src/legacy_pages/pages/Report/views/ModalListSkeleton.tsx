import { Skeleton } from '@/legacy_pages/components'
import { Flex } from '@heyui/component'
import { FC } from 'react'
import styled from 'styled-components'

export const ModalListSkeleton: FC = () => {
  return (
    <>
      <Item align="center" justify="space-between">
        <Skeleton.Bar width={180} height={20} />
        <Skeleton.Bar width={80} height={20} />
      </Item>
      <Item align="center" justify="space-between">
        <Skeleton.Bar width={180} height={20} />
        <Skeleton.Bar width={80} height={20} />
      </Item>
      <Item align="center" justify="space-between">
        <Skeleton.Bar width={180} height={20} />
        <Skeleton.Bar width={80} height={20} />
      </Item>
      <Item align="center" justify="space-between">
        <Skeleton.Bar width={180} height={20} />
        <Skeleton.Bar width={80} height={20} />
      </Item>
      <Item align="center" justify="space-between">
        <Skeleton.Bar width={180} height={20} />
        <Skeleton.Bar width={80} height={20} />
      </Item>
      <Item align="center" justify="space-between">
        <Skeleton.Bar width={180} height={20} />
        <Skeleton.Bar width={80} height={20} />
      </Item>
      <Item align="center" justify="space-between">
        <Skeleton.Bar width={180} height={20} />
        <Skeleton.Bar width={80} height={20} />
      </Item>
      <Item align="center" justify="space-between">
        <Skeleton.Bar width={180} height={20} />
        <Skeleton.Bar width={80} height={20} />
      </Item>
    </>
  )
}

const Item = styled(Flex)`
  padding: 12px 0;
  border-bottom: 1px solid #f3f3f3;
`
