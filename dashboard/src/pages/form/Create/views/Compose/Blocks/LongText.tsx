import { ChevronRightIcon } from '@heroicons/react/outline'
import { Button } from '@heyforms/ui'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const LongText: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="heyform-long-text" field={field} {...restProps}>
      <textarea className="heyform-textarea" placeholder="Your answer here" disabled={true} />
      <p className="heyform-textarea-hit">Hit Shift ⇧ + Enter ↵ for new line</p>
      <div className="mt-8">
        <Button
          className="heyform-next-block-button"
          type="primary"
          trailing={<ChevronRightIcon />}
        >
          Next
        </Button>
      </div>
    </Block>
  )
}
