import { ChevronRightIcon } from '@heroicons/react/outline'
import { Button } from '@heyforms/ui'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Welcome: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="heyform-welcome heyform-empty-state" field={field} {...restProps}>
      <div className="mt-8 text-center">
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
