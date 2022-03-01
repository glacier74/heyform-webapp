import { FC } from 'react'
import { DateIcon, PseudoSuffixInput } from '../components'
import { BlockProps, QuestionBlock } from './Block'

const children = <PseudoSuffixInput icon={<DateIcon />} />

export const DatePicker: FC<BlockProps> = props => {
  return <QuestionBlock {...props}>{children}</QuestionBlock>
}
