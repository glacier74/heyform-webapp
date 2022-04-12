import type { FC } from 'react'
import { FakeSelect } from '../FakeSelect'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Country: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="heyform-country" field={field} {...restProps}>
      <FakeSelect placeholder="Select a country" />
    </Block>
  )
}
