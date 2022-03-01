import { DocumentIcon, UploadIcon } from '@heroicons/react/outline'
import { Button, stopEvent } from '@heyforms/ui'
import { formatBytes, parseBytes } from '@hpnp/utils'
import clsx from 'clsx'
import type { ChangeEvent, DragEvent, FC, MouseEvent } from 'react'
import { useState } from 'react'

export interface DragUploaderProps extends Omit<IComponentProps, 'onChange'> {
  value?: File
  loading?: boolean
  error?: Error | null
  accept?: string[]
  maxSize?: string
  selectText?: string
  reselectText?: string
  uploadingText?: string
  onChange?: (file: File) => void
}

export const DragUploader: FC<DragUploaderProps> = ({
  className,
  value,
  loading = false,
  error,
  accept = [],
  maxSize = '10MB',
  selectText = 'Upload a file',
  reselectText = 'Re-select file to upload',
  uploadingText = 'Uploading',
  onChange,
  ...restProps
}) => {
  const [file, setFile] = useState<File | undefined>(value)
  const [fileInputRef, setFileInputRef] = useState<any>()
  const [dragRef, setDragRef] = useState<any>()
  const [dragoverRef, setDragoverRef] = useState<any>()
  const [dragging, setDragging] = useState(false)
  const [internalError, setInternalError] = useState<Error | null>(null)

  function handleChange(f: File) {
    if (f.size > parseBytes(maxSize)!) {
      return setInternalError(new Error(`The selected file exceeds the ${maxSize} file limit`))
    }

    if (!accept.includes(f.type)) {
      return setInternalError(new Error('Unsupported file type'))
    }

    setFile(f)
    onChange?.(f)
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()

    if (event.type === 'dragenter') {
      setDragoverRef(event.target)
      setDragging(true)
      return
    }

    if (event.type === 'dragleave') {
      if (event.target === dragRef && event.target === dragoverRef) {
        setDragging(false)
      }
      return
    }

    if (event.type === 'dragover') {
      return
    }

    setDragoverRef(undefined)
    setDragging(false)

    handleChange(event.dataTransfer.files[0])
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (files && files.length > 0) {
      handleChange(files[0])
    }

    if (fileInputRef) {
      fileInputRef.value = null
    }
  }

  function handleOpen(event: MouseEvent) {
    fileInputRef?.click()
    stopEvent(event)
  }

  return (
    <div className={clsx('drag-uploader', className)} {...restProps}>
      <input
        className="hidden"
        type="file"
        ref={setFileInputRef}
        accept={accept.join(',')}
        onChange={handleFileChange}
      />
      {file ? (
        <div className="flex justify-center w-full h-full px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="flex flex-col justify-center space-y-1 text-center">
            <DocumentIcon className="non-scaling-stroke mx-auto h-12 w-12 text-gray-400" />
            <p className="text-sm text-gray-600">
              {file!.name} <span>({formatBytes(file!.size)})</span>
            </p>
            <div className="flex items-center justify-center text-sm">
              <Button.Link type="primary" loading={loading} onClick={handleOpen}>
                {loading ? uploadingText : reselectText}
              </Button.Link>
            </div>
            {error && <p className="text-xs text-red-500">{error.message}</p>}
          </div>
        </div>
      ) : (
        <div
          className={clsx(
            'flex justify-center w-full h-full px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md',
            {
              'border-blue-500': dragging
            }
          )}
          ref={setDragRef}
          onDrop={handleDrop}
          onDragOver={handleDrop}
          onDragEnter={handleDrop}
          onDragLeave={handleDrop}
        >
          <div className="flex flex-col justify-center space-y-1 text-center">
            <UploadIcon className="non-scaling-stroke mx-auto h-12 w-12 text-gray-400" />
            <div className="flex items-center justify-center text-sm text-gray-600">
              <Button.Link type="primary" onClick={handleOpen}>
                {selectText}
              </Button.Link>
              <p className="pl-1">or drag and drop</p>
            </div>
            {error || internalError ? (
              <p className="text-xs text-red-500">{error?.message || internalError?.message}</p>
            ) : (
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to {maxSize}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}