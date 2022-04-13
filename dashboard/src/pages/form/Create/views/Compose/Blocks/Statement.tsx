import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Statement: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="builder-statement" field={field} {...restProps}>
      <FakeSubmit text={field.properties?.buttonText} icon={<ChevronRightIcon />} />
    </Block>
  )
}
