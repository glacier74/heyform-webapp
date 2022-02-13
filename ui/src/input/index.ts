import type { FC } from 'react'
import type { InputProps } from './Input'
import Input from './Input'
import type { InputPasswordProps } from './Password'
import Password from './Password'
import type { TextareaProps } from './Textarea'
import Textarea from './Textarea'

type ExportInputType = FC<InputProps> & {
  Password: FC<InputPasswordProps>
  Textarea: FC<TextareaProps>
}

const ExportInput = Input as ExportInputType

ExportInput.Password = Password
ExportInput.Textarea = Textarea

export default ExportInput
