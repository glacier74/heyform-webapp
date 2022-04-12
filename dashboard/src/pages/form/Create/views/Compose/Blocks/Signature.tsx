import type { FC } from 'react'
import type { BlockProps } from './Block'
import { Block } from './Block'

export const Signature: FC<BlockProps> = ({ field, ...restProps }) => {
  return (
    <Block className="heyform-signature" field={field} {...restProps}>
      <div className="heyform-signature-wrapper"></div>
      <div className="heyform-signature-bottom">
        <span>Draw your signature above</span>
        <span>Clear</span>
      </div>
    </Block>
  )
}
