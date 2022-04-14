import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Email: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="builder-email" field={field} {...restProps}>
      <input
        type="email"
        className="builder-input"
        placeholder="email@example.com"
        disabled={true}
      />
      <FakeSubmit text="Next" icon={<ChevronRightIcon />} />
    </Block>
  )
}
