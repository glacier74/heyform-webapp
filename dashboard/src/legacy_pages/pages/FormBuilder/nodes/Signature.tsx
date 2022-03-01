import { FC } from 'react'
import { PseudoTextarea } from '../components'
import { BlockProps, QuestionBlock } from './Block'

const children = <PseudoTextarea />

export const Signature: FC<BlockProps> = props => {
  return <QuestionBlock {...props}>{children}</QuestionBlock>
}
