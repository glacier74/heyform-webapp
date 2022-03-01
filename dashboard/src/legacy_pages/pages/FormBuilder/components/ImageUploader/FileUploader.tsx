import { UserService, WorkspaceService } from '@/service'
import { QiniuCdn } from '@/legacy_pages/utils'
import { Button, ComponentProps, message, stopPropagation } from '@heyui/component'
import { isValid } from '@hpnp/utils/helper'
import { ChangeEvent, DragEvent, FC, MouseEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useParam } from '@/utils'
import styled from 'styled-components'

interface FileUploaderProps extends ComponentProps {
  maxSize?: string
  onChange: (src: string) => void
}

const ACCEPTED_MIMES = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif']

export const FileUploader: FC<FileUploaderProps> = ({
  maxSize = '2MB',
  onChange,
  ...restProps
}) => {
  const { workspaceId } = useParam()
  const [inputRef, setInputRef] = useState<any>()
  const [dragZoneRef, setDragZoneRef] = useState<any>()
  const [dragoverRef, setDragoverRef] = useState<any>()
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleUpload(file: File) {
    if (!ACCEPTED_MIMES.includes(file.type)) {
      message.error('Unsupported file type')
      return
    }

    if (loading) {
      return
    }

    setLoading(true)

    try {
      let cdnTokenData: any

      if (isValid(workspaceId)) {
        const result = await WorkspaceService.cdnToken(workspaceId, file.name, file.type)
        cdnTokenData = result
      } else {
        const result = await UserService.cdnToken(file.name, file.type)
        cdnTokenData = result
      }

      const { token, urlPrefix, key } = cdnTokenData
      const url = `${urlPrefix}/${key}`

      const qc = QiniuCdn.init(file, key, token)
      await qc.upload()

      onChange(url)
    } catch (err: any) {
      console.error(err)
      message.error('Failed to upload the image')
    }

    setLoading(false)
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()

    if (event.type === 'dragenter') {
      setDragoverRef(event.target)
      setDragging(true)
      return
    }

    if (event.type === 'dragleave') {
      if (event.target === dragZoneRef && event.target === dragoverRef) {
        setDragging(false)
      }
      return
    }

    if (event.type === 'dragover') {
      return
    }

    setDragoverRef(undefined)
    setDragging(false)

    const file = event.dataTransfer.files[0]
    handleUpload(file)
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (files && files.length > 0) {
      handleUpload(files[0])
    }

    if (inputRef) {
      inputRef.value = null
    }
  }

  function handleOpenDialog(event: MouseEvent<HTMLDivElement>) {
    event.stopPropagation()
    inputRef?.click()
  }

  return (
    <Container {...restProps}>
      <DropContainer dragging={dragging}>
        <input
          type="file"
          ref={setInputRef}
          accept={ACCEPTED_MIMES.join(',')}
          onClick={stopPropagation}
          onChange={handleFileChange}
        />
        <DropArea
          role="button"
          ref={setDragZoneRef}
          onDrop={handleDrop}
          onDragOver={handleDrop}
          onDragEnter={handleDrop}
          onDragLeave={handleDrop}
        >
          <DropButton loading={loading} onClick={handleOpenDialog}>
            Upload or drop an image
          </DropButton>
          <Description>Image size limit: {maxSize}</Description>
        </DropArea>
      </DropContainer>
    </Container>
  )
}

const Container = styled.div`
  height: 400px;
  padding: 20px;
`

const DropContainer = styled.div<{
  dragging?: boolean
}>`
  height: 100%;
  border: dashed 2px rgba(55, 53, 47, 0.16);
  background: rgb(249, 249, 249);
  border-radius: 3px;

  ${({ dragging }) => dragging && `border-color: #000`};

  &:focus {
    outline: none;
  }

  input {
    display: none;
  }
`

const DropButton = styled(Button)`
  margin-top: 24px;
  margin-bottom: 12px;
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  background: #111827;
  color: #fff;
  cursor: pointer;

  svg {
    margin-left: -5px;
    width: 20px;
    height: 20px;
  }
`

const DropArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const Description = styled.div`
  font-size: 13px;
  color: #8a94a6;
  text-align: center;
`
