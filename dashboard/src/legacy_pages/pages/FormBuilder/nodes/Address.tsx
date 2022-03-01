import { Flex } from '@heyui/component'
import { alpha } from '@hpnp/utils/color'
import { FC } from 'react'
import styled from 'styled-components'
import { ArrowDownIcon, PseudoInput, PseudoSuffixInput } from '../components'
import { BlockProps, QuestionBlock } from './Block'

const AddressField: FC = () => (
  <div>
    <AddressItem column>
      <Label>Address Line 1</Label>
      <PseudoInput />
    </AddressItem>
    <AddressItem column>
      <Label>Address Line 2 (Optional)</Label>
      <PseudoInput />
    </AddressItem>
    <Flex justify="space-between">
      <LeftItem column>
        <Label>City</Label>
        <PseudoInput />
      </LeftItem>
      <RightItem column>
        <Label>State/Province</Label>
        <PseudoInput />
      </RightItem>
    </Flex>
    <Flex justify="space-between">
      <LastLeftItem column>
        <Label>Zip/Postal Code</Label>
        <PseudoInput />
      </LastLeftItem>
      <LastRightItem column>
        <Label>Country</Label>
        <StyledPseudoSuffixInput icon={<ArrowDownIcon />} />
      </LastRightItem>
    </Flex>
  </div>
)

export const Address: FC<BlockProps> = props => {
  return (
    <QuestionBlock {...props}>
      <AddressField />
    </QuestionBlock>
  )
}

const Label = styled.div`
  margin-bottom: 4px;
  font-size: ${props => props.theme.answerFontSize};
  color: ${props => alpha(props.theme.answer, 0.3)};
`

const AddressItem = styled(Flex)`
  margin-bottom: 12px;
`

const LeftItem = styled(AddressItem)`
  width: 50%;
  padding-right: 6px;

  @media only screen and (max-width: 800px) {
    width: 100%;
    padding-right: 0;
  }
`

const RightItem = styled(AddressItem)`
  width: 50%;
  padding-left: 6px;

  @media only screen and (max-width: 800px) {
    width: 100%;
    padding-left: 0;
  }
`

const LastLeftItem = styled(LeftItem)`
  margin-bottom: 0;

  @media only screen and (max-width: 800px) {
    margin-bottom: 12px;
  }
`

const StyledPseudoSuffixInput = styled(PseudoSuffixInput)`
  width: 300px;
`

const LastRightItem = styled(RightItem)`
  margin-bottom: 0;
`
