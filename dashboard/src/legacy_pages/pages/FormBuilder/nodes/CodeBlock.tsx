import { FC } from 'react'
import { PseudoTextarea } from '../components'
import { BlockProps, QuestionBlock } from './Block'

const children = <PseudoTextarea />

export const CodeBlock: FC<BlockProps> = props => {
  return <QuestionBlock {...props}>{children}</QuestionBlock>
}
