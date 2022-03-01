import { FC } from 'react'
import { EmailIcon, PseudoPrefixInput } from '../components'
import { BlockProps, QuestionBlock } from './Block'

const children = <PseudoPrefixInput icon={<EmailIcon />} />

export const EmailInput: FC<BlockProps> = props => {
  return <QuestionBlock {...props}>{children}</QuestionBlock>
}
