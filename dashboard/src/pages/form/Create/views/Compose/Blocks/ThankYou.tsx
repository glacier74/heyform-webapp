import { Button } from '@heyforms/ui'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const ThankYou: FC<BlockProps> = ({ field, className, children, ...restProps }) => {
  return (
    <Block className="heyform-thank-you heyform-empty-state" field={field} {...restProps}>
      <div className="mt-8 text-center">
        <div className="mt-8 text-center">
          <Button className="heyform-next-block-button" type="primary">
            Create a HeyForm
          </Button>
        </div>
      </div>
    </Block>
  )
}
