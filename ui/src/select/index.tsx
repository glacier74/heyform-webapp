import type { FC } from 'react'
import Custom from './Custom'
import type { MultipleSelectProps } from './Multiple'
import Multiple from './Multiple'
import type { SelectProps } from './Native'
import Native from './Native'

const Select: FC<SelectProps> = ({ native, ...restProps }) => {
  return native ? <Native {...restProps} /> : <Custom {...restProps} />
}

type ExportSelectType = FC<SelectProps> & {
  Multiple: FC<MultipleSelectProps>
}

const ExportSelect = Select as ExportSelectType
ExportSelect.Multiple = Multiple

export default ExportSelect
