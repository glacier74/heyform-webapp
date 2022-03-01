import { FC } from 'react'
import { NumberIcon, PseudoSuffixInput } from '../components'
import { BlockProps, QuestionBlock } from './Block'

const children = <PseudoSuffixInput icon={<NumberIcon />} />

export const NumberInput: FC<BlockProps> = props => {
  return <QuestionBlock {...props}>{children}</QuestionBlock>
}
