import type { FC } from 'react'
import { FakeRadio } from '../FakeRadio'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const YesNo: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="builder-yes-no" field={field} {...restProps}>
      <div className="builder-radio-group w-40">
        <FakeRadio hotkey="Y" label="Yes" />
        <FakeRadio hotkey="N" label="No" />
      </div>
    </Block>
  )
}