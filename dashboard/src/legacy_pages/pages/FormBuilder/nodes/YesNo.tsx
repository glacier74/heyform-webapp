import { FC } from 'react'
import { PseudoRadio } from '../components'
import { BlockProps, QuestionBlock } from './Block'

export const YesNo: FC<BlockProps> = ({ ...restProps }) => {
  return (
    <QuestionBlock {...restProps}>
      <PseudoRadio>Yes</PseudoRadio>
      <PseudoRadio>No</PseudoRadio>
    </QuestionBlock>
  )
}
