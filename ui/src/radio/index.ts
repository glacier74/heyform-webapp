import type { FC } from 'react'
import type { RadioGroupProps } from './Group'
import Group from './Group'
import type { RadioProps } from './Radio'
import Radio from './Radio'

type ExportCheckboxType = FC<RadioProps> & {
  Group: FC<RadioGroupProps>
}

const ExportCheckbox = Radio as ExportCheckboxType
ExportCheckbox.Group = Group

export default ExportCheckbox
