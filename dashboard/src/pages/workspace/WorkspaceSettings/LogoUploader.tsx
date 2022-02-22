import { PhotoPickerField, WorkspaceIcon } from '@/components'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useState } from 'react'

export const LogoUploader: FC = observer(() => {
  const { workspaceId } = useParam()
  const workspaceStore = useStore('workspaceStore')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function handleChange(avatar: string) {
    setLoading(true)
    setError(null)

    try {
      await WorkspaceService.update({
        teamId: workspaceId,
        avatar
      })

      workspaceStore.updateWorkspace(workspaceId, {
        avatar
      })
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  return (
    <div>
      <PhotoPickerField
        value={workspaceStore.workspace?.avatar}
        label="Logo"
        description="Pick a logo for your workspace"
        defaultIcon={<WorkspaceIcon />}
        changeLoading={loading}
        onChange={handleChange}
      />

      {error && <div className="form-item-error">{error.message}</div>}
    </div>
  )
})
