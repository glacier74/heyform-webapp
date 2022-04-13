import { FakeSubmit } from '@/pages/form/Create/views/Compose/FakeSubmit'
import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const ThankYou: FC<BlockProps> = ({ field, className, children, ...restProps }) => {
  return (
    <Block className="builder-thank-you builder-empty-state" field={field} {...restProps}>
      <FakeSubmit text={field.properties?.buttonText} />
    </Block>
  )
}
