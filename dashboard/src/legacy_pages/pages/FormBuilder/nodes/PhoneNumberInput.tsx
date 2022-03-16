import { CountryFlag, Flex } from '@heyui/component'
import { FC } from 'react'
import styled from 'styled-components'
import { ArrowDownIcon, PseudoPrefixInput } from '../components'
import { BlockProps, QuestionBlock } from './Block'

export const PhoneNumberInput: FC<BlockProps> = props => {
  return (
    <QuestionBlock {...props}>
      <PseudoPrefixInput
        icon={
          <Flex align="center">
            <CountryFlag code={props.field.properties?.defaultCountryCode || 'US'} />
            <StyledArrowDownIcon />
          </Flex>
        }
      />
    </QuestionBlock>
  )
}

const StyledArrowDownIcon = styled(ArrowDownIcon)`
  margin-left: 4px;
`
