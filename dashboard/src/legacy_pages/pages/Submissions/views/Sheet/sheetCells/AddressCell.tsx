import { SheetCellProps } from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { AddressValue } from '@heyforms/shared-types-enums'
import { FC } from 'react'
import styled from 'styled-components'

export const AddressCell: FC<SheetCellProps> = ({ column, row }) => {
  const value: AddressValue = row[column.key]
  return (
    <Container className="heygrid-cell-text">
      {value && (
        <>
          {value.address1}, {value.address2} {value.city}, {value.state}, {value.zip}
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
