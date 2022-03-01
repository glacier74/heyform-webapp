import { SheetCellProps } from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { FC } from 'react'
import styled from 'styled-components'

export const OpinionScaleCell: FC<SheetCellProps> = ({ column, row }) => {
  const value = row[column.key]

  return (
    <Container className="heygrid-cell-text">
      {value} / {column.properties?.total}
    </Container>
  )
}

const Container = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
