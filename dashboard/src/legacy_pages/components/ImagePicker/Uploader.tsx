import { DragUploader } from '@/legacy_pages/pages/Audience/views/DragUploader'
import { QiniuCdn } from '@/legacy_pages/utils'
import { UserService, WorkspaceService } from '@/service'
import { useParam } from '@/utils'
import { message } from '@heyui/component'
import { isValid } from '@hpnp/utils/helper'
import { FC, useState } from 'react'
import styled from 'styled-components'

interface UploaderProps {
  onUpload: (src: string) => void
}

const ACCEPTED_MIMES = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif']

export const Uploader: FC<UploaderProps> = ({ onUpload }) => {
  const { workspaceId } = useParam()
  const [loading, setLoading] = useState(false)

  async function handleChange(file: File) {
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
        cdnTokenData = await WorkspaceService.cdnToken(workspaceId, file.name, file.type)
      } else {
        cdnTokenData = await UserService.cdnToken(file.name, file.type)
      }

      const { token, urlPrefix, key } = cdnTokenData
      const url = `${urlPrefix}/${key}`

      const qc = QiniuCdn.init(file, key, token)
      await qc.upload()

      onUpload(url)
    } catch (err: any) {
      console.error(err)
      message.error('Failed to upload the image')
    }

    setLoading(false)
  }

  return (
    <StyledDragUploader
      accept={ACCEPTED_MIMES}
      maxSize="2MB"
      selectText="Select image to upload"
      reselectText="Re-select image to upload"
      uploading={loading}
      onChange={handleChange}
    />
  )
}

const StyledDragUploader = styled(DragUploader)`
  height: 540px;
  padding-top: 180px;
  border: none !important;
`
