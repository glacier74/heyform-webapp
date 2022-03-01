import { Flex } from '@heyui/component'
import { alpha } from '@hpnp/utils/color'
import { FC, useMemo } from 'react'
import styled from 'styled-components'
import { StarFillIcon } from '../components'
import { BlockProps, QuestionBlock } from './Block'

interface RatingContainerProps {
  total?: number
}

const RatingContainer: FC<RatingContainerProps> = ({ total = 5 }) => {
  const indexes = useMemo(() => {
    return Array.from({ length: total })
  }, [total])

  return (
    <Container contentEditable={false}>
      {indexes.map((_, index) => {
        return <StarFillIcon key={index} />
      })}
    </Container>
  )
}

export const Rating: FC<BlockProps> = props => {
  return (
    <QuestionBlock {...props}>
      <RatingContainer total={props.field.properties?.total} />
    </QuestionBlock>
  )
}

const Container = styled(Flex)`
  width: 100%;

  svg {
    margin-right: 12px;
    width: 24px;
    height: 24px;
    color: ${props => alpha(props.theme.answer, 0.3)};
  }
`
