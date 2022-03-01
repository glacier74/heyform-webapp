import { SheetCellProps } from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { Input } from '@heyui/component'
import { FC } from 'react'
import styled from 'styled-components'

export const CustomTextCell: FC<SheetCellProps> = ({
  rowIdx,
  column,
  row,
  isCellSelected,
  onCellValueChange
}) => {
  const value = row[column.key]

  function handleChange(value: string) {
    onCellValueChange!(rowIdx!, column, value)
  }

  return (
    <StyledInput
      className="heygrid-cell-input"
      value={value}
      disabled={!isCellSelected}
      onChange={handleChange}
    />
  )
}

const StyledInput = styled(Input)`
  width: 100%;

  input {
    padding: 6px 8px;
    border: none;

    &,
    &[disabled] {
      background: transparent;
      color: ${props => props.theme.text};
    }

    &[disabled] {
      cursor: default;
    }
  }
`
