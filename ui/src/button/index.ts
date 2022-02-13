import type { FC } from 'react'
import type { ButtonProps } from './Button'
import Button from './Button'
import type { ButtonGroupProps } from './Group'
import Group from './Group'

type ExportButtonType = FC<ButtonProps> & {
  Group: FC<ButtonGroupProps>
}

const ExportButton = Button as ExportButtonType
ExportButton.Group = Group

export default ExportButton
