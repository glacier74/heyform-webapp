import { SheetCellProps } from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { FC } from 'react'
import { isObject } from '@hpnp/utils/helper'
import styled from 'styled-components'

export const TextCell: FC<SheetCellProps> = ({ column, row }) => {
  let value = row[column.key]

  if (value && isObject(value)) {
    value = Object.values(value).join(' ')
  }

  return <Container className="heygrid-cell-text">{value?.toString()}</Container>
}

const Container = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
