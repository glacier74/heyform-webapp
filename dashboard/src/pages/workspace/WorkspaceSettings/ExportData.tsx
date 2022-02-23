import { WorkspaceService } from '@/service'
import { useParam } from '@/utils'
import { Button, notification } from '@heyforms/ui'
import type { FC } from 'react'
import { useState } from 'react'

export const ExportData: FC = () => {
  const { workspaceId } = useParam()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function handleClick() {
    setLoading(true)
    setError(null)

    try {
      await WorkspaceService.exportData(workspaceId)
      notification.success({
        title: 'Once the export is ready, you will receive an email with the download link.'
      })
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  return (
    <div>
      <div className="block text-sm font-medium text-gray-700">Export content</div>
      <p className="mt-1 text-sm text-gray-500">
        Get an email with all your forms, settings in one file.
      </p>
      <div className="mt-3">
        <Button loading={loading} onClick={handleClick}>
          Request your data
        </Button>
        {error && <div className="form-item-error">{error.message}</div>}
      </div>
    </div>
  )
}
