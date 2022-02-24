import type { UserModel } from '@/models'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'
import { Modal } from '@heyforms/ui'
import type { FC } from 'react'
import { useState } from 'react'

interface TransferWorkspaceProps extends IModalProps {
  member?: UserModel | null
}

export const TransferWorkspace: FC<TransferWorkspaceProps> = ({ visible, member, onClose }) => {
  const workspaceStore = useStore('workspaceStore')
  const { workspaceId } = useParam()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function handleConfirm() {
    setLoading(true)
    setError(null)

    try {
      await WorkspaceService.transfer(workspaceId, member!.id)

      const [res1, res2] = await Promise.all([
        WorkspaceService.workspaces(),
        WorkspaceService.members(workspaceId)
      ])

      workspaceStore.setWorkspaces(res1)
      workspaceStore.setMembers(workspaceId, res2)

      // Hide modal
      onClose?.()
    } catch (err: any) {
      setError(err)
    }

    setLoading(false)
  }

  return (
    <Modal.Confirm
      type="danger"
      visible={visible}
      title="Are you sure you want to transfer this workspace?"
      description={
        <div className="space-y-2">
          <p>
            Once you confirm to transfer this workspace, you will no longer be the owner of this
            workspace.
          </p>

          {error && <div className="form-item-error">{error.message}</div>}
        </div>
      }
      cancelLabel="Cancel"
      confirmLabel="Transfer"
      confirmDisabled={loading}
      confirmLoading={loading}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={handleConfirm}
    />
  )
}
