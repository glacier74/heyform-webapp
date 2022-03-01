import { SheetCellProps } from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { FC } from 'react'
import styled from 'styled-components'

export const UrlCell: FC<SheetCellProps> = ({ column, row }) => {
  const value = row[column.key]

  return (
    <Container className="heygrid-cell-text">
      <a href={value} target="_blank" rel="noreferrer">
        {value}
      </a>
    </Container>
  )
}

const Container = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
