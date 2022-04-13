import { ChevronRightIcon } from '@heroicons/react/outline'
import { Button } from '@heyforms/ui'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Email: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="builder-email" field={field} {...restProps}>
      <input
        type="email"
        className="builder-input"
        placeholder="email@example.com"
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
