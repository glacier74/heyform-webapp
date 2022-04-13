import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Welcome: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="builder-welcome builder-empty-state" field={field} {...restProps}>
      <FakeSubmit text={field.properties?.buttonText} />
    </Block>
  )
}
