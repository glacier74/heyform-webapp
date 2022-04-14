import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const LongText: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="builder-long-text" field={field} {...restProps}>
      <textarea className="builder-textarea" placeholder="Your answer here" disabled={true} />
      <p className="builder-textarea-hit">Hit Shift ⇧ + Enter ↵ for new line</p>
      <FakeSubmit text="Next" icon={<ChevronRightIcon />} />
    </Block>
  )
}
