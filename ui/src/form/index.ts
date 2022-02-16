import Form from 'rc-field-form'
import type { FC } from 'react'
import type { FormItemProps } from './FormItem'
import FormItem from './FormItem'
import type { SwitchItemProps } from './SwitchItem'
import SwitchItem from './SwitchItem'

type ExportFormType = typeof Form & {
  Item: FC<FormItemProps>
  Switch: FC<SwitchItemProps>
}

const ExportForm = Form as ExportFormType

ExportForm.Item = FormItem
ExportForm.Switch = SwitchItem

export default ExportForm
