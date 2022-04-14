import { SheetCellProps } from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { FC } from 'react'
import styled from 'styled-components'

export const TextCell: FC<SheetCellProps> = ({ column, row }) => {
  const value = row[column.key]
  return <Container className="heygrid-cell-text">{value?.toString()}</Container>
}

const Container = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
