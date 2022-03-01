import { SheetCellProps } from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { ContactModel } from '@heyforms/shared-types-enums'
import { FC } from 'react'
import styled from 'styled-components'

export const ContactCell: FC<SheetCellProps> = ({ row }) => {
  const value: ContactModel = row.contact

  return (
    <Container className="heygrid-cell-text">
      {value && (
        <>
          <img src={value.avatar} />
          <span>{value.fullName}</span>
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  img {
    height: 20px;
    width: auto;
    border-radius: 50%;
    margin-right: 8px;
  }
`
