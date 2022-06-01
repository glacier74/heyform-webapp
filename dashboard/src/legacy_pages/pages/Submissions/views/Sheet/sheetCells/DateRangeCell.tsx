import { SheetCellProps } from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { FC } from 'react'
import styled from 'styled-components'

export const DateRangeCell: FC<SheetCellProps> = ({ column, row }) => {
  const value = row[column.key]
  const arrays = [value?.start, value?.end].filter(Boolean)

  return <Container className="heygrid-cell-text">{arrays.join('  -  ')}</Container>
}

const Container = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
