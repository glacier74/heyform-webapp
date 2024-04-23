import { isNumber, isString, isValid } from '@hpnp/utils/helper'
import { FC, useMemo } from 'react'

import { SheetCellProps } from '../types'

export const OpinionScaleCell: FC<SheetCellProps> = ({ column, row }) => {
  const value = useMemo(() => {
    const v = row[column.key]

    return [isString(v) || isNumber(v) ? v : null, column.properties?.total]
      .filter(isValid)
      .join(' / ')
  }, [column.key, column.properties?.total, row])

  return (
    <div className="heygrid-cell-text overflow-hidden text-ellipsis whitespace-nowrap">{value}</div>
  )
}
