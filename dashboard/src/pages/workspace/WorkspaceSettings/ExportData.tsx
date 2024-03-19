import { Button, notification } from '@heyforms/ui'
import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { WorkspaceService } from '@/service'
import { useParam } from '@/utils'

export const ExportData: FC = () => {
  const { workspaceId } = useParam()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { t } = useTranslation()

  async function handleClick() {
    setLoading(true)
    setError(null)

    try {
      await WorkspaceService.exportData(workspaceId)
      notification.success({
        title: t('workspace.settings.receive')
      })
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  return (
    <div>
      <div className="block text-sm font-medium text-slate-700">
        {t('workspace.settings.export')}
      </div>
      <p className="mt-1 text-sm text-slate-500">{t('workspace.settings.getEmail')}</p>
      <div className="mt-3">
        <Button loading={loading} onClick={handleClick}>
          {t('workspace.settings.exportBottom')}
        </Button>
        {error && <div className="form-item-error">{error.message}</div>}
      </div>
    </div>
  )
}
