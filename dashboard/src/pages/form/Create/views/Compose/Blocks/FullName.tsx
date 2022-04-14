import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon } from '@heroicons/react/outline'
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
      <FakeSubmit text="Next" icon={<ChevronRightIcon />} />
    </Block>
  )
}
