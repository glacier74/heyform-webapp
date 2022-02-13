import type { FC } from 'react'
import Custom from './Custom'
import type { SelectProps } from './Native'
import Native from './Native'

const Select: FC<SelectProps & { native?: boolean }> = ({ native, ...restProps }) => {
  return native ? <Native {...restProps} /> : <Custom {...restProps} />
}

export default Select
