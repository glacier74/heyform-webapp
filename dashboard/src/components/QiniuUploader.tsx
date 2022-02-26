import { UserService, WorkspaceService } from '@/service'
import { Qiniu, useParam } from '@/utils'
import { isValid } from '@hpnp/utils/helper'
import type { FC } from 'react'
import { useState } from 'react'
import type { DragUploaderProps } from './DragUploader'
import { DragUploader } from './DragUploader'

interface QiniuUploaderProps extends Omit<DragUploaderProps, 'value' | 'onChange'> {
  value?: string
  onChange?: (src: string) => void
}

export const QiniuUploader: FC<QiniuUploaderProps> = ({ value, onChange, ...restProps }) => {
  const { workspaceId } = useParam()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>()

  async function handleChange(file: File) {
    if (loading) {
      return
    }

    setError(null)
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

      const qc = new Qiniu(file, key, token)
      await qc.upload()

      onChange?.(url)
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  return <DragUploader {...restProps} error={error} loading={loading} onChange={handleChange} />
}
