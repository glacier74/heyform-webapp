import type { UserModel } from '@/models'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'
import { Modal } from '@heyforms/ui'
import type { FC } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

export const LeaveWorkspace: FC<IModalProps> = ({ visible, onClose }) => {
  const history = useHistory()
  const workspaceStore = useStore('workspaceStore')
  const { workspaceId } = useParam()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function handleConfirm() {
    setLoading(true)
    setError(null)

    try {
      await WorkspaceService.leave(workspaceId)
      workspaceStore.deleteWorkspace(workspaceId)

      history.replace('/')
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  return (
    <Modal.Confirm
      type="danger"
      visible={visible}
      title="Are you sure you want to leave the workspace?"
      description={
        <div className="space-y-2">
          <p>
            Once you confirm to leave this workspace, you will no longer have access to this
            workspace data.
          </p>

          {error && <div className="form-item-error">{error.message}</div>}
        </div>
      }
      cancelLabel="Cancel"
      confirmLabel="Leave"
      confirmDisabled={loading}
      confirmLoading={loading}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={handleConfirm}
    />
  )
}
