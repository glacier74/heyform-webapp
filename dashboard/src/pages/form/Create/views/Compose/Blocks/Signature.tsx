import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import { ChevronRightIcon } from '@heroicons/react/outline'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Signature: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="builder-signature" field={field} {...restProps}>
      <div className="builder-signature-wrapper"></div>
      <div className="builder-signature-bottom">
        <span>Draw your signature above</span>
        <span>Clear</span>
      </div>
      <FakeSubmit text="Next" icon={<ChevronRightIcon />} />
    </Block>
  )
}
