import { ChevronRightIcon } from '@heroicons/react/outline'
import { Button } from '@heyforms/ui'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Number: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="builder-number" field={field} {...restProps}>
      <input
        type="number"
        className="builder-input"
        placeholder="Your answer here"
        disabled={true}
      />
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
