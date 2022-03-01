import { SheetCellProps } from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { FullNameValue } from '@heyforms/shared-types-enums'
import { FC } from 'react'
import styled from 'styled-components'

export const FullNameCell: FC<SheetCellProps> = ({ column, row }) => {
  const value: FullNameValue = row[column.key]

  return (
    <Container className="heygrid-cell-text">
      {value && (
        <>
          {value.firstName} {value.lastName}
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
