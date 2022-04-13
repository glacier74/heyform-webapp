import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import { FakeSelect } from '../FakeSelect'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Address: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="builder-address" field={field} {...restProps}>
      <div className="space-y-4">
        <input type="text" className="builder-input" placeholder="Address Line 1" disabled={true} />
        <input
          type="text"
          className="builder-input"
          placeholder="Address Line 2 (optional)"
          disabled={true}
        />

        <div className="flex items-center space-x-4">
          <input type="text" className="builder-input" placeholder="City" disabled={true} />
          <input
            type="text"
            className="builder-input"
            placeholder="State/Province"
            disabled={true}
          />
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="builder-input"
            placeholder="Zip/Postal Code"
            disabled={true}
          />
          <FakeSelect placeholder="Country" />
        </div>
      </div>
      <FakeSubmit text="Next" icon={<ChevronRightIcon />} />
    </Block>
  )
}
