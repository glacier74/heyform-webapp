import { SheetCellProps } from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { Flex, Image } from '@heyui/component'
import { ImageIcon } from '@heyui/icon'
import { FC } from 'react'
import styled from 'styled-components'

export const PictureChoiceCell: FC<SheetCellProps> = ({ column, row }) => {
  const value = row[column.key]?.value
  const choices = column.properties?.choices?.filter(choice => value?.includes(choice.id))

  return (
    <Container align="center" className="heygrid-cell-text">
      {choices?.map((choice, index) =>
        choice.image ? (
          <Image key={index} url={choice.image!} fit="contain" width={40} height={40} />
        ) : (
          <ImageIcon key={index} />
        )
      )}
    </Container>
  )
}

const Container = styled(Flex)`
  padding: 0 16px;

  img {
    height: 20px;
    width: auto;
    margin-right: 8px;
  }
`
