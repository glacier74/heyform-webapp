import { ChevronRightIcon } from '@heroicons/react/outline'
import { Button } from '@heyforms/ui'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const LongText: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="builder-long-text" field={field} {...restProps}>
      <textarea className="builder-textarea" placeholder="Your answer here" disabled={true} />
      <p className="builder-textarea-hit">Hit Shift ⇧ + Enter ↵ for new line</p>
      <div className="mt-8">
        <Button
          className="builder-next-block-button"
          type="primary"
          trailing={<ChevronRightIcon />}
        >
          Next
        </Button>
      </div>
    </Block>
  )
}
