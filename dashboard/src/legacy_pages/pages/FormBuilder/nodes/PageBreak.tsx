import { FC } from 'react'
import { PageBreakItem } from '../components'
import { Node, NodeProps } from './Block'

export const PageBreak: FC<NodeProps> = props => {
  return (
    <Node {...props}>
      <PageBreakItem>Page {props.field.number}</PageBreakItem>
    </Node>
  )
}
