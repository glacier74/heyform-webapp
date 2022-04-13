import { ChevronRightIcon } from '@heroicons/react/outline'
import { Button } from '@heyforms/ui'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const FullName: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="builder-full-name" field={field} {...restProps}>
      <div className="flex items-center space-x-4">
        <input type="text" className="builder-input" placeholder="First Name" disabled={true} />
        <input type="text" className="builder-input" placeholder="Last Name" disabled={true} />
      </div>
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
