import { ChevronRightIcon } from '@heroicons/react/outline'
import { Button } from '@heyforms/ui'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Statement: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="heyform-statement" field={field} {...restProps}>
      <div className="mt-8">
        <Button
          className="heyform-next-block-button"
          type="primary"
          trailing={<ChevronRightIcon />}
        >
          {field.properties?.buttonText || 'Next'}
        </Button>
      </div>
    </Block>
  )
}
