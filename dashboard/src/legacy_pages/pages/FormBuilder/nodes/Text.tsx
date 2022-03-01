import { FC } from 'react'
import { NodeProps, QuestionBlock } from './Block'

export const Text: FC<NodeProps> = props => {
  return <QuestionBlock placeholder="Type '/' to insert blocks" enableCommand={true} {...props} />
}
