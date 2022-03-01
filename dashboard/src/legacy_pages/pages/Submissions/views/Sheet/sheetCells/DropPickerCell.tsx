import { SheetCellProps } from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { Flex, TagGroup } from '@heyui/component'
import { FC } from 'react'
import styled from 'styled-components'

export const DropPickerCell: FC<SheetCellProps> = ({ column, row }) => {
  const value = row[column.key]
  const choice = column.properties?.choices?.find(choice => choice.id === value)

  return (
    <>
      {choice && (
        <StyledFlex align="center" className="heygrid-cell-text">
          <StyledTagGroup round={true} tags={[choice]} />
        </StyledFlex>
      )}
    </>
  )
}

const StyledFlex = styled(Flex)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const StyledTagGroup = styled(TagGroup)`
  padding: 0 16px;
`
