import type { FC } from 'react'
import { FakeRadio } from '../FakeRadio'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const LegalTerms: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="heyform-legal-terms" field={field} {...restProps}>
      <div className="heyform-radio-group w-56">
        <FakeRadio hotkey="Y" label="I accept" />
        <FakeRadio hotkey="N" label="I don't accept" />
      </div>
    </Block>
  )
}
