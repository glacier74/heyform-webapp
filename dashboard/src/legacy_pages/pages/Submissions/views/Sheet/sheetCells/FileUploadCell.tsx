import { SheetCellProps } from '@/legacy_pages/pages/Submissions/views/Sheet/types'
import { Flex } from '@heyui/component'
import { AttachmentIcon } from '@heyui/icon'
import { isEmpty } from '@hpnp/utils/helper'
import { FC } from 'react'
import styled from 'styled-components'

export const FileUploadCell: FC<SheetCellProps> = ({ column, row }) => {
  const value = row[column.key]

  if (isEmpty(value)) {
    return <Container className="heygrid-cell-text" />
  }

  const filename = encodeURIComponent(value.filename)
  const downloadUrl = `${value.cdnUrlPrefix}/${value.cdnKey}?attname=${filename}`

  return (
    <Container align="center" className="heygrid-cell-text">
      <a href={downloadUrl} target="_blank" rel="noreferrer">
        <FileIcon />
        <FileName>{value.filename}</FileName>
      </a>
    </Container>
  )
}

const Container = styled(Flex)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  a {
    display: inline-flex;
  }
`

const FileIcon = styled(AttachmentIcon)`
  margin-top: 10px;
  width: 20px;
  height: 20px;
  color: #8a94a6;
`

const FileName = styled.div`
  flex: 1;
  margin-left: 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
