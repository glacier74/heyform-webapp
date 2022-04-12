import type { FC } from 'react'
import { FakeSelect } from '../FakeSelect'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Address: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="heyform-address" field={field} {...restProps}>
      <div className="space-y-4">
        <input type="text" className="heyform-input" placeholder="Address Line 1" />
        <input type="text" className="heyform-input" placeholder="Address Line 2 (optional)" />

        <div className="flex items-center space-x-4">
          <input type="text" className="heyform-input" placeholder="City" />
          <input type="text" className="heyform-input" placeholder="State/Province" />
        </div>

        <div className="flex items-center space-x-4">
          <input type="text" className="heyform-input" placeholder="Zip/Postal Code" />
          <FakeSelect placeholder="Country" />
        </div>
      </div>
    </Block>
  )
}
