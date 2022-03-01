import { SheetCellProps } from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { FieldKindEnum } from '@heyforms/shared-types-enums'
import { TagPicker } from '@heyui/component'
// @ts-ignore
import { stopPropagation } from '@heyui/component/esm/utils'
import { FC } from 'react'
import styled from 'styled-components'

export const CustomMultipleCell: FC<SheetCellProps> = ({
  rowIdx,
  column,
  row,
  isCellSelected,
  onColumnOptionsUpdate,
  onCellValueChange
}) => {
  const value = row[column.key]?.value

  function handleCreate(option: any) {
    onColumnOptionsUpdate!(column, {
      choices: [...(column.properties?.choices || []), option]
    })
  }

  function handleUpdate(value: any) {
    onCellValueChange!(rowIdx!, column, {
      value
    })
  }

  return (
    <Container onClick={isCellSelected ? stopPropagation : undefined}>
      <StyledTagPicker
        className="heygrid-tagpicker"
        placement="bottom"
        multiple={column.kind === FieldKindEnum.CUSTOM_MULTIPLE}
        disabled={!isCellSelected}
        tags={column.properties?.choices || []}
        inputPlaceholder="Find or add an option"
        value={value}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
`

const StyledTagPicker = styled(TagPicker)`
  width: 100%;
`
