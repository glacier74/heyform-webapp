import { isNumber, isString } from '@hpnp/utils/helper'
import { FC, useMemo } from 'react'

import { SheetCellProps } from '../types'

export const TextCell: FC<SheetCellProps> = ({ column, row }) => {
  const value = useMemo(() => {
    const v = row[column.key]

    if (isString(v) || isNumber(v)) {
      return v
    }
  }, [column.key, row])

  return (
    <div className="heygrid-cell-text overflow-hidden text-ellipsis whitespace-nowrap">{value}</div>
  )
}
