import { ChevronRightIcon } from '@heroicons/react/outline'
import { Button } from '@heyforms/ui'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const FullName: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="heyform-full-name" field={field} {...restProps}>
      <div className="flex items-center space-x-4">
        <input type="text" className="heyform-input" placeholder="First Name" />
        <input type="text" className="heyform-input" placeholder="Last Name" />
      </div>
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
