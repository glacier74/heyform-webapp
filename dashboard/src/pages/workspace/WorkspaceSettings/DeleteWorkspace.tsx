import { WorkspaceService } from '@/service'
import { useStore } from '@/store'
import { useParam, useVisible } from '@/utils'
import { Button, Input, Modal } from '@heyforms/ui'
import type { InputValue } from '@heyforms/ui/lib/types/input/Input'
import { isEmpty } from '@hpnp/utils/helper'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const DeleteWorkspaceModal: FC<IModalProps> = observer(({ visible, onClose }) => {
  const { workspaceId } = useParam()
  const history = useHistory()
  const workspaceStore = useStore('workspaceStore')

  const [isDisabled, setIsDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  function handleChange(value?: InputValue) {
    setIsDisabled(isEmpty(value) || value !== workspaceStore.workspace?.name)
  }

  async function handleConfirm() {
    setLoading(true)
    setError(null)

    try {
      await WorkspaceService.dissolve(workspaceId)

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
      title="Are you sure you want to delete this workspace?"
      description={
        <div className="space-y-2">
          <p>
            Keep in mind this operation is irreversible and will permanently delete all the data
            associated with this workspace.
          </p>
          <p>
            Once you confirm to dissolve the workspace, you will no longer have access to the
            workspace data.
          </p>
          <Input
            placeholder={`Please type ${workspaceStore.workspace.name} to confirm`}
            onChange={handleChange}
          />
          {error && <div className="form-item-error">{error.message}</div>}
        </div>
      }
      confirmLabel="I understand, delete the workspace anyway"
      confirmDisabled={loading || isDisabled}
      confirmLoading={loading}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  )
})

export const DeleteWorkspace: FC = () => {
  const [visible, handleOpen, handleClose] = useVisible()

  return (
    <div>
      <div className="block text-sm font-medium text-gray-700">Dissolve workspace</div>
      <p className="mt-1 text-sm text-gray-500">
        By dissolving the team, all the forms and data will be erased and cannot be restored! Be
        cautious!
      </p>
      <div className="mt-3">
        <Button type="danger" onClick={handleOpen}>
          Dissolve workspace
        </Button>
      </div>

      <DeleteWorkspaceModal visible={visible} onClose={handleClose} />
    </div>
  )
}
