import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Number: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="builder-number" field={field} {...restProps}>
      <input
        type="number"
        className="builder-input"
        placeholder="Your answer here"
        disabled={true}
      />
      <FakeSubmit text="Next" icon={<ChevronRightIcon />} />
    </Block>
  )
}
