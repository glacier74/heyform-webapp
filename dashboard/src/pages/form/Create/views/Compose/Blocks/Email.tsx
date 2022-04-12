import { ChevronRightIcon } from '@heroicons/react/outline'
import { Button } from '@heyforms/ui'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Email: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="heyform-email" field={field} {...restProps}>
      <input type="email" className="heyform-input" placeholder="email@example.com" />
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
