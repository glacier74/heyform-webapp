import { FC } from 'react'
import { ArrowDownIcon, PseudoSuffixInput } from '../components'
import { BlockProps, QuestionBlock } from './Block'

export const CountryPicker: FC<BlockProps> = props => {
  return (
    <QuestionBlock {...props}>
      <PseudoSuffixInput icon={<ArrowDownIcon />} />
    </QuestionBlock>
  )
}
