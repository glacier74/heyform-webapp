import { FileIcon, UploadCloudIcon } from '@/legacy_pages/components/Icons'
import { Button, ComponentProps, stopPropagation } from '@heyui/component'
import { formatBytes } from '@hpnp/utils/bytes'
import { ChangeEvent, DragEvent, FC, MouseEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface DragUploaderProps extends ComponentProps {
  value?: any
  accept?: string[]
  maxSize?: string
  uploading?: boolean
  selectText?: string
  reselectText?: string
  uploadingText?: string
  onChange?: (file: File) => void
}

export const DragUploader: FC<DragUploaderProps> = ({
  value,
  accept = [],
  maxSize = '10MB',
  uploading = false,
  selectText = 'Select file to upload',
  reselectText = 'Re-select file to upload',
  uploadingText = 'Uploading',
  onChange,
  ...restProps
}) => {
  const { t } = useTranslation()
  const [file, setFile] = useState<File | undefined>(value)
  const [fileInputRef, setFileInputRef] = useState<any>()
  const [dragZoneRef, setDragZoneRef] = useState<any>()
  const [dragoverRef, setDragoverRef] = useState<any>()
  const [dragging, setDragging] = useState(false)

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
    setFile(file)
    onChange && onChange(file)
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (files && files.length > 0) {
      setFile(files[0])
      onChange && onChange(files[0])
    }

    if (fileInputRef) {
      fileInputRef.value = null
    }
  }

  function handleOpenDialog(event: MouseEvent<HTMLDivElement>) {
    event.stopPropagation()
    fileInputRef?.click()
  }

  return (
    <Container dragging={dragging} {...restProps}>
      <input
        type="file"
        ref={setFileInputRef}
        accept={accept.join(',')}
        onClick={stopPropagation}
        onChange={handleFileChange}
      />
      {file ? (
        <Preview>
          <FileIcon />
          <FileMetadata>
            {file!.name} <span>({formatBytes(file!.size)})</span>
          </FileMetadata>
          <OpenDialogButton loading={uploading} onClick={handleOpenDialog}>
            {uploading ? t(uploadingText) : t(reselectText)}
          </OpenDialogButton>
        </Preview>
      ) : (
        <DragDrop
          role="button"
          ref={setDragZoneRef}
          onDrop={handleDrop}
          onDragOver={handleDrop}
          onDragEnter={handleDrop}
          onDragLeave={handleDrop}
        >
          <UploadCloudIcon />
          <OpenDialogButton onClick={handleOpenDialog}>{t(selectText)}</OpenDialogButton>
          <Description>
            {t('You can drag and drop file here to upload. File size should not exceed {{size}}', {
              size: maxSize
            })}
          </Description>
        </DragDrop>
      )}
    </Container>
  )
}

const Container = styled.div<{
  dragging?: boolean
}>`
  padding: 48px 24px;
  border: dashed 2px rgba(55, 53, 47, 0.16);
  background: rgb(249, 249, 249);
  border-radius: 3px;

  ${({ dragging, theme }) => dragging && `border-color: ${theme.primary}`};

  &:focus {
    outline: none;
  }

  input {
    display: none;
  }
`

const OpenDialogButton = styled(Button)`
  margin-top: 24px;
  margin-bottom: 12px;
  border: none;
  background: #fafbfc;

  svg {
    margin-left: -5px;
    width: 20px;
    height: 20px;
  }
`

const DragDrop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Preview = styled(DragDrop)`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${OpenDialogButton} {
    margin-bottom: 0;
  }
`

const FileMetadata = styled.div`
  margin-top: 8px;

  span {
    color: #8a94a6;
  }
`

const Description = styled.div`
  font-size: 13px;
  color: #8a94a6;
  text-align: center;
`
