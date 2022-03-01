import { SheetCellProps } from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { unixDate } from '@hpnp/utils/date'
import { FC } from 'react'
import styled from 'styled-components'

export const SubmitDateCell: FC<SheetCellProps> = ({ row }) => {
  const value: number = row.endAt ?? 0

  return (
    <Container className="heygrid-cell-text">{unixDate(value).format('MMM DD, YYYY')}</Container>
  )
}

const Container = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
