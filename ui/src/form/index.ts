import Form from 'rc-field-form'
import type { FC } from 'react'
import type { FormItemProps } from './FormItem'
import FormItem from './FormItem'

type ExportFormType = typeof Form & {
  Item: FC<FormItemProps>
}

const ExportForm = Form as ExportFormType
ExportForm.Item = FormItem

export default ExportForm
