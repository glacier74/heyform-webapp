import { FC } from 'react'
import { PseudoPrefixInput } from '../components'
import { BlockProps, QuestionBlock } from './Block'

const children = <PseudoPrefixInput />

export const ShortText: FC<BlockProps> = props => {
  return <QuestionBlock {...props}>{children}</QuestionBlock>
}
