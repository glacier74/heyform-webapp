import { Flex } from '@heyui/component'
import { alpha } from '@hpnp/utils/color'
import { FC } from 'react'
import styled from 'styled-components'
import { PseudoInput } from '../components'
import { BlockProps, QuestionBlock } from './Block'

const Children = () => (
  <Flex justify="space-between" contentEditable={false}>
    <LeftItem column>
      <Label>First Name</Label>
      <PseudoInput />
    </LeftItem>
    <RightItem column>
      <Label>Last Name</Label>
      <PseudoInput />
    </RightItem>
  </Flex>
)

export const FullName: FC<BlockProps> = props => {
  return (
    <QuestionBlock {...props}>
      <Children />
    </QuestionBlock>
  )
}

const Label = styled.div`
  margin-bottom: 4px;
  font-size: ${props => props.theme.answerFontSize};
  color: ${props => alpha(props.theme.answer, 0.3)};
`

const Item = styled(Flex)`
  margin-bottom: 12px;
`

const LeftItem = styled(Item)`
  width: 50%;
  padding-right: 6px;

  @media only screen and (max-width: 800px) {
    width: 100%;
    padding-right: 0;
  }
`

const RightItem = styled(Item)`
  width: 50%;
  padding-left: 6px;

  @media only screen and (max-width: 800px) {
    width: 100%;
    padding-left: 0;
  }
`
