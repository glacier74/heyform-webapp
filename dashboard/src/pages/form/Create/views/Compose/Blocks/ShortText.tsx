import { ChevronRightIcon } from '@heroicons/react/outline'
import { Button } from '@heyforms/ui'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const ShortText: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="heyform-short-text" field={field} {...restProps}>
      <input type="text" className="heyform-input" placeholder="Your answer here" disabled={true} />
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
