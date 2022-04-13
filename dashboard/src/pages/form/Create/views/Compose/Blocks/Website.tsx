import { ChevronRightIcon } from '@heroicons/react/outline'
import { Button } from '@heyforms/ui'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Website: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="builder-website" field={field} {...restProps}>
      <input
        type="url"
        className="builder-input"
        placeholder="https://example.com"
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
