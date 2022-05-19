// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { questionNumber } from '@heyforms/form-component/esm/utils'
import type { FC } from 'react'
import type { FieldIconProps } from '../FieldIcon'
import { FieldIcon } from '../FieldIcon'

interface FieldKindIconProps extends FieldIconProps {
  parentIndex?: number
}

export const FieldKindIcon: FC<FieldKindIconProps> = ({ parentIndex, index, ...restProps }) => {
  return (
    <FieldIcon
      className="field-card-icon"
      index={questionNumber(index, parentIndex)}
      iconOnly={false}
      {...restProps}
    />
  )
}
