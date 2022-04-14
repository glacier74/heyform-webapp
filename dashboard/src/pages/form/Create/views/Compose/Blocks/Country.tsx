import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import { FakeSelect } from '../FakeSelect'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Country: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="builder-country" field={field} {...restProps}>
      <FakeSelect placeholder="Select a country" />
      <FakeSubmit text="Next" icon={<ChevronRightIcon />} />
    </Block>
  )
}
