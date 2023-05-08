import { SheetCellProps } from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { isValid, isValidArray } from '@hpnp/utils/helper'
import { FC } from 'react'
import styled from 'styled-components'

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

  return <Container className="heygrid-cell-text">{text}</Container>
}

const Container = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
