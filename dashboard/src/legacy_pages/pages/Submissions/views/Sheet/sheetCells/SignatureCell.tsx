import { SheetCellProps } from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { Flex, Image } from '@heyui/component'
import { FC } from 'react'
import styled from 'styled-components'

export const SignatureCell: FC<SheetCellProps> = ({ column, row }) => {
  const value = row[column.key]
  return (
    <Container className="heygrid-cell-text" align="center">
      {value && <StyledImage url={value} fit="contain" width={80} height={40} />}
    </Container>
  )
}

const Container = styled(Flex)`
  overflow: hidden;
  padding: 0 16px;
  height: 39px;
  line-height: 1;
`

const StyledImage = styled(Image)`
  width: 44px;
  height: 20px;
`
