import { Flex } from '@heyui/component'
import { alpha } from '@hpnp/utils/color'
import { FC, useMemo } from 'react'
import styled from 'styled-components'
import { BlockProps, QuestionBlock } from './Block'

export const OpinionScale: FC<BlockProps> = props => {
  const indexes = useMemo(() => {
    return Array.from({ length: props.field.properties?.total || 5 }).map((_, index) => index + 1)
  }, [props.field.properties?.total])

  return (
    <QuestionBlock {...props}>
      <Container contentEditable={false}>
        {indexes.map(index => (
          <Item key={index}>{index}</Item>
        ))}
      </Container>
    </QuestionBlock>
  )
}

const Container = styled(Flex)`
  border-radius: 4px;
  box-shadow: 0 2px 4px ${props => alpha(props.theme.answer, 0.05)};
`

const Item = styled.div`
  flex: 1;
  margin-left: -1px;
  font-size: ${props => props.theme.answerFontSize};
  color: ${props => alpha(props.theme.answer, 0.3)};
  line-height: 28px;
  text-align: center;
  border-width: 1px 0 1px 1px;
  border-style: solid;
  border-color: ${props => alpha(props.theme.answer, 0.3)};
  transition: background-color 0.3s;

  &:nth-of-type(1) {
    border-radius: 4px 0 0 4px;
  }

  &:nth-last-of-type(1) {
    border-width: 1px;
    border-radius: 0 4px 4px 0;
  }
`
