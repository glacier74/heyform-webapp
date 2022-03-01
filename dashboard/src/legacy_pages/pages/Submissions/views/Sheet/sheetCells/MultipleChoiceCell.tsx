import { SheetCellProps } from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { Flex, TagGroup } from '@heyui/component'
import { FC } from 'react'
import styled from 'styled-components'

export const MultipleChoiceCell: FC<SheetCellProps> = ({ column, row }) => {
  const value = row[column.key]?.value
  const choices = column.properties?.choices?.filter(choice => value?.includes(choice.id))

  return (
    <>
      {choices && (
        <StyledFlex align="center" className="heygrid-cell-text">
          <StyledTagGroup round={true} tags={choices} />
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

const StyledTagGroup = styled(TagGroup)``
