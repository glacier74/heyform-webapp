import type { UserModel } from '@/models'
import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useParam } from '@/utils'
import { Modal } from '@heyforms/ui'
import type { FC } from 'react'
import { useState } from 'react'

interface DeleteMemberProps extends IModalProps {
  member?: UserModel | null
}

export const DeleteMember: FC<DeleteMemberProps> = ({ visible, member, onClose }) => {
  const workspaceStore = useStore('workspaceStore')
  const { workspaceId } = useParam()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function handleConfirm() {
    setLoading(true)
    setError(null)

    try {
      await WorkspaceService.removeMember(workspaceId, member!.id)
      workspaceStore.deleteMember(workspaceId, member!.id)

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
      title="Are you sure you want to remove this member?"
      description={
        <div className="space-y-2">
          <p>
            Once you confirm to remove this member, member will no longer have access to this
            workspace data.
          </p>

          {error && <div className="form-item-error">{error.message}</div>}
        </div>
      }
      cancelLabel="Cancel"
      confirmLabel="Remove"
      confirmDisabled={loading}
      confirmLoading={loading}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={handleConfirm}
    />
  )
}
