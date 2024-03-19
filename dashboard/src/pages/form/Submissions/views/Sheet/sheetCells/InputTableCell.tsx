import { isValid, isValidArray } from '@hpnp/utils/helper'
import { FC } from 'react'

import { SheetCellProps } from '../types'

export const InputTableCell: FC<SheetCellProps> = ({ column, row }) => {
  const value = row[column.key]
  const columns = column.properties?.tableColumns
  let text = ''

  if (isValidArray(columns) && isValid(value)) {
    const result: string[] = []

    value.forEach((v: Record<string, string>) => {
      if (isValid(v)) {
        result.push(columns!.map(c => v[c.id]).join(', '))
      }
    })

    text = result.join('|')
  }

  return (
    <div className="heygrid-cell-text overflow-hidden text-ellipsis whitespace-nowrap">{text}</div>
  )
}
