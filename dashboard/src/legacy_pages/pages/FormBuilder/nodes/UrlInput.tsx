import { FC } from 'react'
import { PseudoPrefixInput, UrlIcon } from '../components'
import { BlockProps, QuestionBlock } from './Block'

const children = <PseudoPrefixInput icon={<UrlIcon />} />

export const UrlInput: FC<BlockProps> = props => {
  return <QuestionBlock {...props}>{children}</QuestionBlock>
}
